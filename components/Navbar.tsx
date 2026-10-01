"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Navbar — FE-4. MBTA subway-line navbar where the train glides to the station of the
// section/page you're on. Works BOTH ways:
//   • hash mode (default): links are #slug, active station = scroll-spy on in-page sections
//   • route mode (pass routeBase): links are `${routeBase}/slug`, active = current pathname
// Keying both off a shared `slug` lets one component serve single-page and multi-route apps.
//
// Hash-mode scrolling is fully JS-driven (scrollToSection below) rather than left
// to `<a href="#slug">` + CSS `scroll-behavior: smooth`. The native smooth scroll
// kept "stopping at Prizes" on the way to Sponsors: over a long jump Chrome races
// most of the distance and then crawls the last stretch, and any trackpad momentum
// still arriving from a previous swipe interrupts it outright. Owning the animation
// also means we know exactly when it ends, so scroll-spy is simply paused for its
// duration — no guessing via timers or `scrollend` (the old source of "train snaps
// back to the previous station" bugs).
type Station = { label: string; slug: string };

const STATIONS: Station[] = [
  { label: "Sign Up", slug: "signup" },
  { label: "Tracks", slug: "tracks" },
  { label: "Schedule", slug: "schedule" },
  { label: "FAQs", slug: "faq" },
  { label: "Prizes", slug: "prizes" },
  { label: "Sponsors", slug: "sponsors" },
];

const TRAIN_WIDTH = 120;
const PARKED_LEFT = 150;

// Sections line up under the sticky nav via their own `scroll-mt-*` (140px mobile /
// 215px desktop), so both the click target and scroll-spy read it from the element
// rather than hard-coding one offset for every breakpoint.
const scrollMargin = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Scrolls the window to `targetY` over a fixed ease (400ms–1s by distance), calling
// `onDone` when it lands or is cancelled. Returns a cancel function. While running:
// per-frame scrollTo must be instant (the global CSS `scroll-behavior: smooth`
// would otherwise turn every frame into its own smooth scroll), and wheel/touch
// input is swallowed so leftover trackpad momentum can't fight the animation.
function animateScrollTo(targetY: number, onDone: () => void): () => void {
  const root = document.documentElement;
  const startY = window.scrollY;
  const endY = Math.min(root.scrollHeight - window.innerHeight, Math.max(0, targetY));
  const distance = endY - startY;

  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const block = (e: Event) => e.preventDefault();
  window.addEventListener("wheel", block, { passive: false });
  window.addEventListener("touchmove", block, { passive: false });

  let raf = 0;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", block);
    window.removeEventListener("touchmove", block);
    root.style.scrollBehavior = prevBehavior;
    onDone();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 2) {
    window.scrollTo(0, endY);
    finish();
    return finish;
  }

  const duration = Math.min(1000, 400 + Math.abs(distance) * 0.06);
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else finish();
  };
  raf = requestAnimationFrame(step);
  return finish;
}

export default function Navbar({ routeBase }: { routeBase?: string }) {
  const routed = Boolean(routeBase);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [spyActive, setSpyActive] = useState(-1);
  const [trainLeft, setTrainLeft] = useState(PARKED_LEFT);

  // Route mode: active = the station matching the pathname's last segment.
  const routeSeg = pathname.split("/").filter(Boolean).pop() ?? "";
  const routeActive = Math.max(0, STATIONS.findIndex((s) => s.slug === routeSeg));
  const active = routed ? routeActive : spyActive;

  // ---------- Train position ----------
  const moveTrain = useCallback((i: number) => {
    const nav = navRef.current;
    const st = stationRefs.current[i];
    if (i < 0 || !nav || !st) return setTrainLeft(PARKED_LEFT);
    const navRect = nav.getBoundingClientRect();
    const stRect = st.getBoundingClientRect();
    setTrainLeft(stRect.left - navRect.left + stRect.width / 2 - TRAIN_WIDTH / 2);
  }, []);

  useEffect(() => {
    moveTrain(active);
    const onResize = () => moveTrain(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveTrain]);

  // ---------- Scroll-spy (hash mode) ----------
  // Active = the last section whose top has reached its own scroll-margin line.
  // Paused (animating.current) while a click-driven scroll is in flight.
  const animating = useRef(false);

  const pickActive = useCallback(() => {
    if (animating.current) return;
    let best = -1;
    STATIONS.forEach((s, i) => {
      const el = document.getElementById(s.slug);
      if (el && el.getBoundingClientRect().top <= scrollMargin(el) + 1) best = i;
    });
    // At the very bottom the last section may never reach the line — count it anyway.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && document.getElementById(STATIONS[STATIONS.length - 1].slug)) best = STATIONS.length - 1;
    setSpyActive(best);
  }, []);

  useEffect(() => {
    if (routed) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; pickActive(); });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [routed, pickActive]);

  // ---------- Click-driven scroll (hash mode) ----------
  const cancelScroll = useRef<() => void>(() => {});
  useEffect(() => () => cancelScroll.current(), []); // stop any in-flight scroll on unmount

  const scrollToSection = (i: number) => {
    const el = document.getElementById(STATIONS[i].slug);
    if (!el) return false;
    cancelScroll.current();
    const targetY = el.getBoundingClientRect().top + window.scrollY - scrollMargin(el);
    setSpyActive(i);
    animating.current = true;
    cancelScroll.current = animateScrollTo(targetY, () => {
      animating.current = false;
    });
    return true;
  };

  const onStationClick = (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (routed) return; // Next <Link> handles navigation; active comes from the pathname
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // new tab etc.
    if (!scrollToSection(i)) return; // section not on this page — let the browser navigate
    e.preventDefault();
    history.pushState(null, "", `#${STATIONS[i].slug}`);
  };

  const stationLink = (s: Station, i: number, className: string, children: React.ReactNode) => {
    const props = {
      href: routed ? `${routeBase}/${s.slug}` : `#${s.slug}`,
      onClick: onStationClick(i),
      "aria-current": active === i ? ("true" as const) : undefined,
      className,
    };
    return routed ? <Link {...props}>{children}</Link> : <a {...props}>{children}</a>;
  };

  return (
    <nav aria-label="Primary" className="sticky top-0 z-50 w-full overflow-hidden bg-white shadow-sm">
      {/* ---------- Desktop ---------- */}
      <div ref={navRef} className="relative mx-auto hidden h-[210px] max-w-[1440px] px-8 md:block">
        {/* Thick grey track band with dark rails — rounded ends */}
        <div className="pointer-events-none absolute inset-x-8 top-[40px] h-[46px] overflow-hidden rounded-full" aria-hidden>
          <div className="absolute inset-0 bg-ms-gray" />
          <div className="absolute inset-x-0 top-[10px] h-[5px] bg-ms-gray-darker" />
          <div className="absolute inset-x-0 top-[30px] h-[5px] bg-ms-gray-darker" />
        </div>

        {/* Train pill — glides to the active station */}
        <div
          className="pointer-events-none absolute top-[42px] flex h-[42px] w-[120px] items-center rounded-[40px] border-[5px] border-black bg-white px-4 shadow motion-safe:transition-[left] motion-safe:duration-700 motion-safe:ease-in-out"
          style={{ left: trainLeft }}
          aria-hidden
        >
          <span className="mx-auto h-4 w-4 rounded-full bg-black" />
        </div>

        <a href={routed ? routeBase : "#top"} aria-label="BostonHacks home" className="absolute left-[112px] top-[112px] transition-transform hover:-translate-y-0.5">
          <Image src="/images/navbar/logo.svg" alt="BostonHacks" width={78} height={67} priority unoptimized />
        </a>

        {/* MLH official trust badge (public/images/navbar/mlh-badge.svg), natural
            aspect ratio 392.79:688 — no Figma frame for this exists in the
            wireframe file, so it's positioned/sized by eye next to the logo
            rather than against a spec. */}
        <a
          href="https://mlh.io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Major League Hacking"
          className="absolute left-[210px] top-[100px] transition-transform hover:-translate-y-0.5"
        >
          <Image src="/images/navbar/mlh-badge.svg" alt="Major League Hacking" width={51} height={90} unoptimized />
        </a>

        <ul className="absolute right-8 top-[18px] grid w-[76%] grid-cols-6 justify-items-center">
          {STATIONS.map((s, i) => (
            <li key={s.slug} ref={(el) => { stationRefs.current[i] = el; }} className="flex flex-col items-center">
              {stationLink(
                s,
                i,
                "group flex flex-col items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue",
                <>
                  <span
                    aria-hidden
                    className={`block h-[92px] w-[48px] rounded-[22px] border-[16px] bg-white shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-track-blue ${
                      active === i ? "border-track-blue" : "border-ms-gray"
                    }`}
                  />
                  <span
                    className={`mt-8 -rotate-45 whitespace-nowrap font-helvetica text-2xl font-bold tracking-wide transition-colors group-hover:text-track-blue ${
                      active === i ? "text-track-blue" : "text-black"
                    }`}
                  >
                    {s.label}
                  </span>
                </>,
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 border-b-4 border-ms-gray px-4 py-3">
          <Image src="/images/navbar/logo.svg" alt="BostonHacks" width={44} height={38} priority unoptimized />
          <a href="https://mlh.io" target="_blank" rel="noopener noreferrer" aria-label="Major League Hacking" className="shrink-0">
            <Image src="/images/navbar/mlh-badge.svg" alt="Major League Hacking" width={22} height={39} unoptimized />
          </a>
          <div className="relative h-[14px] flex-1" aria-hidden>
            <div className="absolute inset-x-0 top-0 h-[14px] rounded bg-ms-gray" />
            <div className="absolute inset-x-0 top-[5px] h-[4px] bg-ms-gray-darker" />
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-2 px-4 py-3">
          {STATIONS.map((s, i) => (
            <li key={s.slug}>
              {stationLink(
                s,
                i,
                `inline-block rounded-full border-[3px] bg-white px-4 py-1.5 font-helvetica text-lg font-bold transition-colors ${
                  active === i ? "border-track-blue text-track-blue" : "border-ms-gray text-black"
                }`,
                s.label,
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Navbar — FE-4. MBTA subway-line navbar where the train glides to the station of the
// section/page you're on. Works BOTH ways:
//   • hash mode (default): links are #slug, active station = scroll-spy on in-page sections
//   • route mode (pass routeBase): links are `${routeBase}/slug`, active = current pathname
// Keying both off a shared `slug` lets one component serve single-page and multi-route apps.
type Station = { label: string; slug: string };

const STATIONS: Station[] = [
  { label: "Sign Up", slug: "signup" },
  { label: "Theme", slug: "theme" },
  { label: "Tracks", slug: "tracks" },
  { label: "Schedule", slug: "schedule" },
  { label: "FAQs", slug: "faq" },
  { label: "Sponsors", slug: "sponsors" },
];

const TRAIN_WIDTH = 120;
const PARKED_LEFT = 150;
const NAV_OFFSET = 215;

export default function Navbar({ routeBase }: { routeBase?: string }) {
  const routed = Boolean(routeBase);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [scrollActive, setScrollActive] = useState<number>(-1); // hash-mode active (scroll/click)
  const [trainLeft, setTrainLeft] = useState<number>(PARKED_LEFT);

  const hrefFor = (s: Station) => (routed ? `${routeBase}/${s.slug}` : `#${s.slug}`);

  // Route mode: the active station is the current pathname's last segment.
  const routeActive = useMemo(() => {
    if (!routed) return -1;
    const seg = pathname.split("/").filter(Boolean).pop() ?? "";
    return STATIONS.findIndex((s) => s.slug === seg);
  }, [routed, pathname]);

  // Effective active: derived from the pathname in route mode, from scroll/click in hash mode.
  const active = routed ? (routeActive >= 0 ? routeActive : 0) : scrollActive;

  // Position the train under station `i` (or park it when i < 0).
  const moveTrain = useCallback((i: number) => {
    const nav = navRef.current;
    const st = stationRefs.current[i];
    if (i < 0 || !nav || !st) {
      setTrainLeft(PARKED_LEFT);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const stRect = st.getBoundingClientRect();
    setTrainLeft(stRect.left - navRect.left + stRect.width / 2 - TRAIN_WIDTH / 2);
  }, []);

  useEffect(() => {
    moveTrain(active);
  }, [active, moveTrain]);

  useEffect(() => {
    const onResize = () => moveTrain(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveTrain]);

  // Hash mode: scroll-spy — active station = last section whose top has
  // scrolled up past NAV_OFFSET. (Route mode needs none of this; `active` is
  // derived from the pathname above.)
  //
  // REBUILT FROM SCRATCH after repeated "snaps back to the previous station"
  // reports on click-driven navigation, through several increasingly complex
  // attempts (IntersectionObserver with a thin percentage-based detection
  // band, then with a Set of intersecting ids, then suppression keyed off the
  // `scrollend` event). The detection rule itself — scan every section's live
  // getBoundingClientRect().top, take the one with the largest value that's
  // still <= NAV_OFFSET — was correct in the very first version and never
  // the actual problem.
  //
  // The real, persistent bug: clicking a station sets the correct index
  // immediately, but the resulting smooth scroll (a plain `<a href="#slug">`
  // plus CSS `scroll-behavior: smooth` — not a JS-driven scroll) takes real,
  // *variable* time to finish. Every prior fix tried to guess when that
  // animation ends (a fixed timer, or the `scrollend` event) so it would
  // know when it's safe to let live scroll-position detection take over
  // again — and `scrollend`'s support/reliability for CSS-driven smooth
  // scroll turned out too inconsistent to trust, so scroll-spy kept
  // re-enabling itself mid-animation and stomping the click's answer with
  // whatever section the animation was still passing over.
  //
  // Fixed by not guessing at all: suppress scroll-spy from the moment a
  // station is clicked, and resume only once the user provides a genuine,
  // unambiguous manual-scroll input (wheel, touch, or a scroll-relevant key)
  // — never on a timer, never on an animation-completion event.
  const manualScrolling = useRef(false);

  useEffect(() => {
    if (routed) return;
    const sections = STATIONS.map((s) => document.getElementById(s.slug)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return; // isolated preview with no sections — click-driven only

    const pickActive = () => {
      if (manualScrolling.current) return; // a click-scroll may still be animating — don't fight it
      let bestIdx = -1;
      let bestTop = -Infinity;
      sections.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top <= NAV_OFFSET && top > bestTop) {
          bestTop = top;
          bestIdx = STATIONS.findIndex((s) => s.slug === el.id);
        }
      });
      if (bestIdx >= 0) setScrollActive(bestIdx);
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; pickActive(); });
    };

    const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"]);
    const resume = () => {
      if (!manualScrolling.current) return;
      manualScrolling.current = false;
      pickActive();
    };
    const resumeOnKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) resume();
    };

    onScroll(); // initial read
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", resume, { passive: true });
    window.addEventListener("touchstart", resume, { passive: true });
    window.addEventListener("keydown", resumeOnKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("keydown", resumeOnKey);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [routed]);

  const StationLink = ({ s, i, children, className }: { s: Station; i: number; children: React.ReactNode; className: string }) => {
    const props = {
      onClick: () => {
        manualScrolling.current = true;
        setScrollActive(i);
      },
      "aria-current": active === i ? ("true" as const) : undefined,
      className,
    };
    return routed ? (
      <Link href={hrefFor(s)} {...props}>{children}</Link>
    ) : (
      <a href={hrefFor(s)} {...props}>{children}</a>
    );
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
              <StationLink s={s} i={i} className="group flex flex-col items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue">
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
              </StationLink>
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
              <StationLink s={s} i={i} className={`inline-block rounded-full border-[3px] bg-white px-4 py-1.5 font-helvetica text-lg font-bold transition-colors ${
                active === i ? "border-track-blue text-track-blue" : "border-ms-gray text-black"
              }`}>
                {s.label}
              </StationLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

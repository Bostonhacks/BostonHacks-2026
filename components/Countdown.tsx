"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Countdown — FE-14, rebuilt against the actual Figma artwork (node 462:447/462:449
// "image 299") instead of a CSS approximation: a hand-drawn MBTA canister/thermometer
// sign, with the day/hour count, line, and stop dots overlaid at the same relative
// positions as the original (percentages computed from the node's own coordinates).
// Placeholder date until BostonHacks 2026 dates are officially announced.
const TARGET_DATE = "2026-10-02T09:00:00-04:00";

function getRemaining(target: Date) {
  const totalHours = Math.max(0, Math.floor((target.getTime() - Date.now()) / (1000 * 60 * 60)));
  return { days: Math.floor(totalHours / 24), hours: totalHours % 24 };
}

export default function Countdown() {
  // null until mounted — guards against SSR/client clock mismatch (hydration error)
  const [remaining, setRemaining] = useState<{ days: number; hours: number } | null>(null);

  useEffect(() => {
    const target = new Date(TARGET_DATE);
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const mounted = remaining !== null;

  return (
    <section
      aria-label="Countdown"
      className="relative isolate w-full overflow-hidden px-8 py-16 font-akshar text-black"
      style={{
        // Soft blue wash, per Figma node 462:419 (Rectangle 2208) — its own exact
        // gradient stops, not a guess: white(20%) -> blue(20%) at ~49.5% -> white(20%).
        // The section previously showed a stray, fully-opaque page-wide blue gradient
        // (a leftover `body` background rule from before this redesign) instead of
        // this much softer, locally-scoped wash — that's what "too blue" was.
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(0,170,225,0.2) 49.5%, rgba(255,255,255,0.2) 100%)",
      }}
    >
      {/* Blueprint grid, per Figma nodes 462:396/462:420 — present throughout this
          area in the source but previously missing here entirely. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Yellow route line, per Figma node 462:439 — exact-percentage-canvas
          technique, see Hero.tsx for the full rationale. Canvas native size
          1286.35 x 1807.84px, anchored at Figma point (420.81, 9845.03).
          Previously hidden below the `lg` breakpoint entirely (shown on desktop
          only) and undersized/mispositioned even there — now visible and sized
          at every viewport width, consistent with the rest of the site. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: "89.33%", marginLeft: "29.22%", aspectRatio: "1286.35 / 1807.84" }}
      >
        <Image src="/images/countdown/line-yellow.svg" alt="" fill unoptimized className="object-contain object-left-top" />
      </div>

      {/* Background squiggle, per Figma node 462:438 — get_metadata reports a
          layout box (2033x1393 at x=1769, i.e. mostly off the right edge of the
          viewport) that doesn't match what get_screenshot actually renders for
          this vector (1440x597, i.e. clearly meant to span close to full
          viewport width) — trusting the rendered aspect ratio over the
          transform-space metadata here. Positioned independently (viewport-
          width-relative, own aspect ratio) rather than folded into the
          yellow-line canvas above, same principle as TracksSection's hook line. */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-16 w-full opacity-70" style={{ aspectRatio: "1440 / 597" }}>
        <Image src="/images/countdown/squiggle.svg" alt="" fill unoptimized className="object-contain" />
      </div>

      <div className="relative mx-auto w-full max-w-[290px]" style={{ aspectRatio: "868 / 2557" }}>
        <Image src="/images/countdown/sign.png" alt="" fill unoptimized className="object-contain" />

        {/* Vertical line + stop dots, per Rectangle 2211/2212 and Ellipse 86/87.
            Positions measured against the sign's actual pixel content (the white
            body starts at ~20.7% down, not the ~22.9% the Figma text-box
            coordinates alone implied) so nothing overlaps the gray band. */}
        <span
          aria-hidden
          className="absolute w-[4%] rounded-full"
          style={{ left: "18.3%", top: "25%", height: "35%", backgroundColor: "var(--track-body)" }}
        />
        <span
          aria-hidden
          className="absolute w-[4%] rounded-full"
          style={{ left: "18.3%", top: "25%", height: "8%", backgroundColor: "var(--track-green)" }}
        />
        <span
          aria-hidden
          className="absolute h-[3%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: "20.3%", top: "27%", backgroundColor: "var(--track-green)", boxShadow: "0 0 0 3px white" }}
        />
        <span
          aria-hidden
          className="absolute h-[3%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ left: "20.3%", top: "58%", boxShadow: "0 0 0 3px var(--track-body)" }}
        />

        <p className="absolute font-inter text-[64px] font-extrabold leading-none" style={{ left: "30.6%", top: "23%" }} aria-live="polite">
          {mounted ? remaining.hours : "--"}
          <span className="font-medium">h</span>
        </p>

        <div className="absolute flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-black/60" style={{ left: "26.1%", top: "34%" }}>
          <Image src="/images/countdown/track-icon.svg" alt="" width={12} height={12} aria-hidden />
          Now
        </div>

        <p className="absolute font-inter text-[64px] font-extrabold leading-none" style={{ left: "22.3%", top: "39%" }} aria-live="polite">
          {mounted ? remaining.days : "--"}
          <span className="font-medium">d</span>
        </p>

        <p className="absolute text-[10px] font-bold uppercase tracking-wide text-black/60" style={{ left: "26.1%", top: "61%" }}>
          Hackathon
        </p>
        <p className="absolute text-base font-bold" style={{ left: "15.5%", top: "64.5%" }}>
          BostonHacks
        </p>
      </div>
    </section>
  );
}

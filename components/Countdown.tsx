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
      className="relative isolate w-full overflow-hidden bg-white px-8 py-16 font-akshar text-black"
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
          technique, see Hero.tsx for the full rationale. Sized from the SVG's
          own true rendered dimensions (1305.21 x 1808.59), not the nominal
          Figma frame box (1286.35 x 1807.84) — the frame's own reference code
          insets the image slightly beyond its frame (rounded line-cap
          overflow), so sizing to the frame alone shrinks the rendered line a
          few percent thinner than Figma actually draws it. Anchored at Figma
          point (414.38, 9845.03), adjusted from the frame's (420.81, 9845.03)
          for the same left-inset reason. Previously hidden below the `lg`
          breakpoint entirely (shown on desktop only) — now visible at every
          viewport width, consistent with the rest of the site. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: "90.64%", marginLeft: "28.78%", aspectRatio: "1305.21 / 1808.59" }}
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

      {/* Sign position/size, per Figma node 462:447/462:449 — measured both from
          the node's raw coordinates (x=827, width=579 in the 1440-wide frame)
          and directly off the rendered reference screenshot (pixel bbox
          579-939 of a 978px-wide full-page capture, i.e. the same ~77.6%
          center / ~36.8% width once scaled to 1440) — two independent methods
          agreeing confirms it: the sign sits right-of-center and noticeably
          larger than a small centered card, not centered like the previous
          mx-auto/max-w-[290px] had it. Kept centered+capped below `sm` only,
          since pinning a 530px-equivalent sign at 77% across would overflow a
          phone-width viewport and blow up the countdown digits inside it. */}
      <div
        className="relative mx-auto w-full max-w-[290px] sm:mx-0 sm:ml-[59.17%] sm:w-[36.81%] sm:max-w-none"
        style={{ aspectRatio: "868 / 2557" }}
      >
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

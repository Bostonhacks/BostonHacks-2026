"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Countdown — FE-14. MBTA-thermometer motif per Figma node 462:447 ("90d 6h...",
// "Now" / "Hackathon" stops) — simplified into a track-green line + two stops,
// reusing the line/stop language already established in ScheduleGrid (FE-10).
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
    <section aria-label="Countdown" className="w-full bg-white px-8 py-16 font-akshar text-black">
      <div className="mx-auto flex max-w-md items-stretch gap-6 rounded-2xl border-[6px] border-black bg-white px-8 py-10 shadow-md">
        <div className="relative flex w-6 shrink-0 flex-col items-center">
          <span
            aria-hidden
            className="absolute inset-y-2 left-1/2 w-2 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: "var(--track-green)" }}
          />
          <span
            aria-hidden
            className="relative z-10 h-5 w-5 rounded-full"
            style={{ backgroundColor: "var(--track-green)", boxShadow: "0 0 0 4px white" }}
          />
          <span className="flex-1" />
          <span
            aria-hidden
            className="relative z-10 h-5 w-5 rounded-full bg-white"
            style={{ boxShadow: "0 0 0 4px var(--track-body)" }}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black/60">
            <Image src="/images/countdown/track-icon.svg" alt="" width={18} height={18} aria-hidden />
            Now
          </div>

          <p className="text-6xl font-extrabold leading-none sm:text-7xl" aria-live="polite">
            {mounted ? remaining.days : "--"}
            <span className="text-3xl font-medium sm:text-4xl">d</span>{" "}
            {mounted ? remaining.hours : "--"}
            <span className="text-3xl font-medium sm:text-4xl">h</span>
          </p>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-black/60">Hackathon</p>
            <p className="text-2xl font-bold">BostonHacks</p>
          </div>
        </div>
      </div>
    </section>
  );
}

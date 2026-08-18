// ScheduleGrid — FE-10 layout component.
// MBTA transit-timetable: a blue subway line down the left with white station stops
// that light up top->bottom to show the train moving stop to stop (Figma design comment),
// Day 1/2/3 blocks as time-label + dotted-leader + event rows with color-coded day stops
// (Red / Green / Blue), a "happening now" row, a red cross-line, and a faint blueprint grid.
// Event data lives in scheduleData.ts (FE-11) — this component only groups/renders it,
// so adding an event there requires no changes here.
// ponytail: pure presentational, no state, so no "use client".

import { SCHEDULE_EVENTS, type ScheduleEvent } from "./scheduleData";

const DAY_COLOR: Record<ScheduleEvent["day"], string> = {
  1: "var(--track-red)",
  2: "var(--track-green)",
  3: "var(--track-blue)",
};

const DAYS: ScheduleEvent["day"][] = [1, 2, 3];

function ScheduleRow({ row, color }: { row: ScheduleEvent; color: string }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg px-3 text-xl leading-[2] text-black sm:text-2xl ${
        row.now ? "font-semibold" : ""
      }`}
      style={row.now ? { backgroundColor: "var(--faq-highlight)", color: "white" } : undefined}
    >
      <span className="w-28 shrink-0 sm:w-32">{row.time}</span>
      <span aria-hidden className="h-0 min-w-6 flex-1 border-b-[3px] border-dotted" style={{ borderColor: row.now ? "rgba(255,255,255,.6)" : "rgba(0,0,0,.35)" }} />
      <span className="flex w-40 shrink-0 items-center gap-2 sm:w-52">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.now ? "#fff" : color }} />
        {row.title}
        {row.now && <span className="ml-auto text-xs font-bold uppercase tracking-wider">now</span>}
      </span>
    </div>
  );
}

export default function ScheduleGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white py-14 font-akshar text-black">
      {/* Figma's dots (462:341's Ellipse 75/77/78/80) are plain solid-white circles with
          no ring or glow — that box-shadow effect was never actually in the source, so
          it's gone. This keeps only a subtle scale pulse for the "train moving stop to
          stop" flavor from Figma's own design comment, without inventing a visual style
          Figma doesn't have. */}
      <style>{`
        @keyframes scheduleStopPulseA {
          0%, 100% { transform: scale(1); }
          12%      { transform: scale(1.35); }
        }
        .schedule-stop-a { animation: scheduleStopPulseA 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .schedule-stop-a { animation: none; } }
      `}</style>

      {/* Faint blueprint grid, lower-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 90% at 100% 100%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 100% 100%, black 15%, transparent 70%)",
        }}
      />

      {/* Blue line + animated stops, per Figma node 462:341/462:342. Color is
          Figma's distinct, more saturated #206DDF here, not --track-blue
          (#2F9DD9). Sizing: an earlier pass computed "48px" straight from the
          SVG's raw stroke-width units, treating them as 1:1 with rendered CSS
          px — wrong, since this section isn't built as a scaled canvas the
          way Hero/ThemeGraphics are, so there's no fixed unit correspondence.
          Re-derived by directly measuring the reference screenshots against
          this row's own text size instead: line width ≈ 1.16x, dots ≈ 0.8x
          the row text's glyph height. Plain fixed px, no viewport-relative
          units — the line's a decorative constant, it doesn't need to be
          dynamic. */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex w-5 flex-col items-center justify-between sm:left-[52px]" aria-hidden>
        <div className="absolute inset-y-6 left-1/2 w-5 -translate-x-1/2 rounded-full" style={{ backgroundColor: "#206DDF" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="schedule-stop-a relative z-10 h-4 w-4 rounded-full bg-white" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl pb-24 pl-12 pr-6 sm:pl-[130px] sm:pr-6">
        {/* Marker-highlight, per Figma: a solid #206DDF band cutting through the
            lower half of the letters (same schedule-specific blue as the route
            line, not --track-blue) — was a thin translucent strip below the
            baseline instead. Same background-gradient-behind-text technique as
            Hero's Login/Sponsor Us highlight. */}
        <h2 className="relative mb-10 inline-block font-akshar text-5xl font-bold sm:text-6xl md:text-[64px]" style={{ backgroundImage: "linear-gradient(transparent 55%, #206DDF 55%)" }}>
          Schedule
        </h2>

        <div className="space-y-8">
          {DAYS.map((day) => (
            <div key={day} className="space-y-0.5">
              {SCHEDULE_EVENTS.filter((e) => e.day === day).map((e) => (
                <ScheduleRow key={`${e.day}-${e.time}-${e.title}`} row={e} color={DAY_COLOR[day]} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Red cross-line near the bottom, per Figma node 462:362 — same re-derivation
          as the blue line above: band height ≈ 1.72x the row text's glyph height,
          measured directly off the reference screenshots rather than the SVG's raw
          units. The black-ring "now" dot's white fill sits inside a black ring —
          a CSS border-box border stays fully inside its own box, matching that. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 flex h-8 items-center" style={{ backgroundColor: "var(--track-red)" }} aria-hidden>
        <span className="absolute left-[46px] h-8 w-8 rounded-full border-[5px] border-black bg-white" />
        <span className="absolute h-[18px] w-[18px] rounded-full bg-white" style={{ left: "42.4%" }} />
        <span className="absolute h-[18px] w-[18px] rounded-full bg-white" style={{ left: "69%" }} />
      </div>
    </section>
  );
}

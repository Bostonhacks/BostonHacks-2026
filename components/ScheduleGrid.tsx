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

      {/* Blue line + animated stops, per Figma node 462:341/462:342 — this was hand-
          coded CSS never actually checked against Figma's real numbers (unlike the
          image-based route lines elsewhere, which went through that check already).
          The real source SVG's stroke-width is 50 in its own 1020-wide coordinate
          space, i.e. ~48px at a 1440px viewport (min(48px, 3.36vw) below) — nowhere
          close to the 8-12px CSS width this had. Color is also wrong: Figma uses a
          distinct, more saturated #206DDF here, not --track-blue (#2F9DD9). Dots are
          35x35 in Figma, not 16-20px. */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex flex-col items-center justify-between sm:left-[52px]" style={{ width: "min(48px, 3.36vw)" }} aria-hidden>
        <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 rounded-full" style={{ width: "min(48px, 3.36vw)", backgroundColor: "#206DDF" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="schedule-stop-a relative z-10 rounded-full bg-white"
            style={{ width: "min(35px, 2.43vw)", height: "min(35px, 2.43vw)", animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl pb-24 pl-16 pr-6 sm:pl-[150px] sm:pr-6">
        <h2 className="relative mb-10 inline-block font-akshar text-5xl font-bold sm:text-6xl md:text-[64px]">
          <span className="relative z-10">Schedule</span>
          <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-3.5" style={{ backgroundColor: "var(--track-blue)", opacity: 0.55 }} />
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

      {/* Red cross-line near the bottom, per Figma node 462:362 — same story as the
          blue line: the band's real stroke-width is 75 (~70px at 1440 viewport, not
          the 40px this had), and the black-ring "now" dot is a 60px white circle with
          a 10px black stroke centered on its edge (60+2*5=70px total) — CSS border-box
          borders sit fully inside the box, so a 70px box with a 10px border reproduces
          that exactly. Side dots are 39.5px, not 16px. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 flex items-center" style={{ height: "min(70px, 4.86vw)", backgroundColor: "var(--track-red)" }} aria-hidden>
        <span
          className="absolute left-[46px] rounded-full border-black bg-white"
          style={{ width: "min(70px, 4.86vw)", height: "min(70px, 4.86vw)", borderWidth: "min(10px, 0.694vw)" }}
        />
        <span className="absolute rounded-full bg-white" style={{ left: "42.4%", width: "min(39.5px, 2.74vw)", height: "min(39.5px, 2.74vw)" }} />
        <span className="absolute rounded-full bg-white" style={{ left: "69%", width: "min(39.5px, 2.74vw)", height: "min(39.5px, 2.74vw)" }} />
      </div>
    </section>
  );
}

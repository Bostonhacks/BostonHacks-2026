// ScheduleGrid — FE-10 layout component.
// MBTA transit-timetable: a blue subway line down the left with white station stops
// that light up top->bottom to show the train moving stop to stop (Figma design comment),
// Day 1/2/3 blocks as time-label + dotted-leader + event rows with color-coded day stops
// (Red / Green / Blue), a "happening now" row, a red cross-line, and a faint blueprint grid.
// Placeholder data lives in `days` — swappable for real data in FE-11.
// ponytail: pure presentational, no state, so no "use client".

type Row = { label: string; event: string; now?: boolean };
type Day = { color: string; rows: Row[] };

const days: Day[] = [
  {
    color: "var(--track-red)",
    rows: [
      { label: "Day 1", event: "Opening" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Orientation" },
      { label: "12:00 pm", event: "Hacking starts" },
      { label: "1:00 pm", event: "Workshops" },
    ],
  },
  {
    color: "var(--track-green)",
    rows: [
      { label: "Day 2", event: "Wake up" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Mentoring", now: true },
      { label: "12:00 pm", event: "Mini-event" },
      { label: "1:00 pm", event: "Demos" },
    ],
  },
  {
    color: "var(--track-blue)",
    rows: [
      { label: "Day 3", event: "Wake up" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Judging" },
      { label: "12:00 pm", event: "Closing" },
      { label: "1:00 pm", event: "Awards" },
    ],
  },
];

function ScheduleRow({ row, color }: { row: Row; color: string }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg px-3 text-xl leading-[2] text-black sm:text-2xl ${
        row.now ? "font-semibold" : ""
      }`}
      style={row.now ? { backgroundColor: "var(--faq-highlight)", color: "white" } : undefined}
    >
      <span className="w-28 shrink-0 sm:w-32">{row.label}</span>
      <span aria-hidden className="h-0 min-w-6 flex-1 border-b-[3px] border-dotted" style={{ borderColor: row.now ? "rgba(255,255,255,.6)" : "rgba(0,0,0,.35)" }} />
      <span className="flex w-40 shrink-0 items-center gap-2 sm:w-52">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.now ? "#fff" : color }} />
        {row.event}
        {row.now && <span className="ml-auto text-xs font-bold uppercase tracking-wider">now</span>}
      </span>
    </div>
  );
}

export default function ScheduleGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white py-14 font-akshar text-black">
      <style>{`
        @keyframes scheduleStopGlowA {
          0%, 100% { background:#fff; box-shadow:0 0 0 5px var(--track-blue); }
          12%      { background:var(--gradient-stop-2); box-shadow:0 0 0 5px var(--track-blue), 0 0 16px 6px var(--track-blue); }
        }
        .schedule-stop-a { animation: scheduleStopGlowA 3s ease-in-out infinite; }
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

      {/* Blue line + animated stops */}
      <div className="pointer-events-none absolute inset-y-0 left-[52px] hidden w-3 flex-col items-center justify-between sm:flex" aria-hidden>
        <div className="absolute inset-y-6 left-1/2 w-3 -translate-x-1/2 rounded-full" style={{ backgroundColor: "var(--track-blue)" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="schedule-stop-a relative z-10 h-5 w-5 rounded-full bg-white" style={{ boxShadow: "0 0 0 5px var(--track-blue)", animationDelay: `${i * 0.6}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-24 pl-[110px] sm:pl-[130px]">
        <h2 className="relative mb-10 inline-block font-akshar text-4xl font-bold">
          <span className="relative z-10">Schedule</span>
          <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-3.5" style={{ backgroundColor: "var(--track-blue)", opacity: 0.55 }} />
        </h2>

        <div className="space-y-8">
          {days.map((day, di) => (
            <div key={di} className="space-y-0.5">
              {day.rows.map((r) => (
                <ScheduleRow key={r.label} row={r} color={day.color} />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-6 pl-3 text-sm text-neutral-500">Placeholder schedule — real events wired in FE-11.</p>
      </div>

      {/* Red cross-line near the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 flex h-10 items-center" style={{ backgroundColor: "var(--track-red)" }} aria-hidden>
        <span className="absolute left-[46px] h-6 w-6 rounded-full border-[3px] border-black bg-white" />
        <span className="absolute left-[38%] h-4 w-4 rounded-full bg-white" />
        <span className="absolute left-[62%] h-4 w-4 rounded-full bg-white" />
      </div>
    </section>
  );
}

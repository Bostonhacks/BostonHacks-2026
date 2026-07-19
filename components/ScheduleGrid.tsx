// ScheduleGrid — FE-10 layout component.
// MBTA transit-map timetable: a blue subway line runs down the left with white
// station stops (which light up top->bottom to show the train moving stop to stop,
// per the Figma design comment), Day 1/2/3 blocks as a time-label + dotted-leader +
// event list, a red cross-line near the bottom, and a faint blueprint grid.
// Placeholder data lives in `days` — swappable for real data in FE-11.
// ponytail: pure presentational, no state, so no "use client".

type Row = { label: string; event: string };
type Day = { rows: Row[] };

// Each day's first row's label IS the "Day N" header (paired with the first event),
// matching the Figma text layout.
const days: Day[] = [
  {
    rows: [
      { label: "Day 1", event: "Wake up" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Orientation" },
      { label: "12:00 pm", event: "How 2 code" },
      { label: "1:00 pm", event: "Yay" },
    ],
  },
  {
    rows: [
      { label: "Day 2", event: "Wake up" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Idk" },
      { label: "12:00 pm", event: "How 2 code" },
      { label: "1:00 pm", event: "Yay" },
    ],
  },
  {
    rows: [
      { label: "Day 3", event: "Wake up" },
      { label: "10:00 am", event: "Breakfast" },
      { label: "11:00 am", event: "Design" },
      { label: "12:00 pm", event: "How 2 code" },
      { label: "1:00 pm", event: "Yay" },
    ],
  },
];

function ScheduleRow({ label, event }: Row) {
  return (
    <div className="flex items-center gap-4 text-xl leading-[1.9] text-black sm:text-2xl">
      <span className="w-28 shrink-0 sm:w-32">{label}</span>
      {/* dotted leader between label and event */}
      <span aria-hidden className="h-0 min-w-6 flex-1 border-b-[3px] border-dotted border-black/70" />
      <span className="w-40 shrink-0 sm:w-52">{event}</span>
    </div>
  );
}

export default function ScheduleGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white py-14 font-akshar text-black">
      {/* Stops light up top->bottom to show the train moving stop to stop (Figma comment). */}
      <style>{`
        @keyframes scheduleStopGlow {
          0%, 100% { background:#fff; box-shadow:0 0 0 5px var(--track-blue); }
          12%      { background:var(--gradient-stop-2); box-shadow:0 0 0 5px var(--track-blue), 0 0 16px 6px var(--track-blue); }
        }
        .schedule-stop { animation: scheduleStopGlow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .schedule-stop { animation: none; } }
      `}</style>

      {/* Faint blue blueprint grid, biased to the lower-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 90% at 100% 100%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 100% 100%, black 15%, transparent 70%)",
        }}
      />

      {/* Blue subway line down the left with white stops (top, one per day, bottom) */}
      <div className="pointer-events-none absolute inset-y-0 left-[52px] hidden w-3 flex-col items-center justify-between rounded-full sm:flex" aria-hidden>
        <div className="absolute inset-y-6 left-1/2 w-3 -translate-x-1/2 rounded-full" style={{ backgroundColor: "var(--track-blue)" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="schedule-stop relative z-10 h-5 w-5 rounded-full bg-white"
            style={{ boxShadow: "0 0 0 5px var(--track-blue)", animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pl-[110px] sm:pl-[130px]">
        <h2 className="relative mb-10 inline-block font-akshar text-4xl font-bold">
          <span className="relative z-10">Schedule</span>
          <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-3.5" style={{ backgroundColor: "var(--track-blue)", opacity: 0.55 }} />
        </h2>

        <div className="space-y-9">
          {days.map((day, di) => (
            <div key={di} className="space-y-0.5">
              {day.rows.map((r) => (
                <ScheduleRow key={r.label} label={r.label} event={r.event} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Red subway cross-line near the bottom, with an interchange + two stops */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 flex h-10 items-center" style={{ backgroundColor: "var(--track-red)" }} aria-hidden>
        {/* interchange (black-ringed) sits on the blue line */}
        <span className="absolute left-[46px] h-6 w-6 rounded-full border-[3px] border-black bg-white" />
        <span className="absolute left-[38%] h-4 w-4 rounded-full bg-white" />
        <span className="absolute left-[62%] h-4 w-4 rounded-full bg-white" />
      </div>
    </section>
  );
}

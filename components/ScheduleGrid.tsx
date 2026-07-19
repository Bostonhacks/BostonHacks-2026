// ScheduleGrid — FE-10 layout component.
// MBTA transit-map themed 3-day schedule grid: time axis (rows) x Day 1/2/3 (columns).
// Placeholder data lives in `days` — swappable for real data in FE-11.
// ponytail: pure presentational, no state, so no "use client".

type Day = {
  label: string;
  events: string[];
};

// Row time labels (left axis). Length must match each day's events array.
const times = ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm"];

const days: Day[] = [
  { label: "Day 1", events: ["Wake up", "Breakfast", "Orientation", "How 2 code", "Yay"] },
  { label: "Day 2", events: ["Wake up", "Breakfast", "Idk", "How 2 code", "Yay"] },
  { label: "Day 3", events: ["Wake up", "Breakfast", "Design", "How 2 code", "Yay"] },
];

// White station dot with a colored ring, used along the transit lines.
function StationDot({ ring, className = "" }: { ring: string; className?: string }) {
  return (
    <span
      className={`block h-4 w-4 rounded-full bg-white ${className}`}
      style={{ boxShadow: `0 0 0 4px ${ring}` }}
      aria-hidden
    />
  );
}

export default function ScheduleGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white py-16 font-akshar text-black">
      {/* Faint blueprint grid, biased to the lower-right like the wireframe */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1px, transparent 1px)," +
            "linear-gradient(to bottom, var(--track-blue) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(120% 90% at 100% 100%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 100% 100%, black 20%, transparent 70%)",
        }}
      />

      {/* Blue subway spine down the left, curving in at the top */}
      <div className="pointer-events-none absolute inset-y-0 left-6 -z-0 hidden sm:block" aria-hidden>
        <div
          className="absolute top-10 h-24 w-16 rounded-tl-full border-l-8 border-t-8"
          style={{ borderColor: "var(--track-blue)" }}
        />
        <div
          className="absolute bottom-0 left-16 top-[8.5rem] w-2 rounded-full"
          style={{ backgroundColor: "var(--track-blue)" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 sm:pl-28">
        <h2 className="mb-10 text-4xl font-medium tracking-wide">Schedule</h2>

        {/* Scrolls horizontally on narrow screens instead of breaking the page */}
        <div className="overflow-x-auto pb-4">
          <div
            className="grid min-w-[640px] gap-px"
            style={{
              gridTemplateColumns: "minmax(6rem,auto) repeat(3, minmax(0,1fr))",
              backgroundColor: "var(--faq-line)",
              border: "1px solid var(--faq-line)",
            }}
          >
            {/* Header row: blank corner + day labels, each with a station dot */}
            <div className="bg-white p-4" />
            {days.map((day) => (
              <div key={day.label} className="flex items-center gap-3 bg-white p-4">
                <StationDot ring="var(--track-blue)" />
                <span className="text-2xl font-medium">{day.label}</span>
              </div>
            ))}

            {/* Time rows */}
            {times.map((time, row) => (
              <FragmentRow key={time} time={time} row={row} />
            ))}
          </div>
        </div>
      </div>

      {/* Red subway line crossing horizontally near the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-10 -z-0 flex h-8 items-center px-4"
        style={{ backgroundColor: "var(--track-red)" }}
        aria-hidden
      >
        <StationDot ring="var(--track-red)" className="ml-4" />
        <StationDot ring="var(--track-red)" className="ml-[30%]" />
        <StationDot ring="var(--track-red)" className="ml-[20%]" />
      </div>
    </section>
  );
}

// One time-slot row: left axis label + the same slot across all three days.
function FragmentRow({ time, row }: { time: string; row: number }) {
  return (
    <>
      <div className="bg-white p-4 text-xl text-neutral-500">{time}</div>
      {days.map((day) => (
        <div key={day.label} className="bg-white p-4 text-xl">
          {day.events[row]}
        </div>
      ))}
    </>
  );
}

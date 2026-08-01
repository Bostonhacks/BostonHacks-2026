import TrackCard from "./TrackCard";

// TracksSection — FE-9. Composes 3x TrackCard (FE-8) in the stacked/offset,
// alternating-side layout shown in Figma node 462:280, with a dashed connector
// line echoing the "connecting line" between cards. Subtitles (Inbound/To
// Trains/Outbound) match the default platform-sign state from that node;
// descriptions are placeholder copy shown in TrackCard's expanded state.
const TRACKS = [
  { color: "blue" as const, title: "Track One", subtitle: "Inbound", description: "Description of track one", align: "sm:mr-auto" },
  { color: "green" as const, title: "Track Two", subtitle: "To Trains", description: "Description of track two", align: "sm:ml-auto" },
  { color: "red" as const, title: "Track Three", subtitle: "Outbound", description: "Description of track three", align: "sm:mr-auto" },
];

export default function TracksSection() {
  return (
    <section id="tracks" aria-label="Tracks" className="relative w-full overflow-hidden bg-white px-8 py-20 font-akshar text-black">
      <h2 className="mx-auto mb-14 max-w-3xl text-center text-4xl font-bold">Tracks</h2>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-16 sm:gap-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-0 -translate-x-1/2 border-l-[3px] border-dashed border-black/20 sm:block"
        />
        {TRACKS.map((track) => (
          <div key={track.title} className={`w-full max-w-md ${track.align}`}>
            <TrackCard color={track.color} title={track.title} subtitle={track.subtitle} description={track.description} />
          </div>
        ))}
      </div>
    </section>
  );
}

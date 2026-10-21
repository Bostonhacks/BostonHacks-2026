import Image from "next/image";
import TrackCard, { type TrackDescription } from "./TrackCard";

// TracksSection — FE-9. Composes 3x TrackCard (FE-8) in the stacked/offset,
// alternating-side layout shown in Figma node 462:280, with a dashed connector
// line echoing the "connecting line" between cards. Subtitles (Inbound/To
// Trains/Outbound) match the default platform-sign state from that node; the
// sign header shows the track's name (Figma's placeholder said "Track One" etc.)
// and its challenge brief is shown in TrackCard's expanded state.
const TRACKS: {
  color: "blue" | "green" | "red";
  title: string;
  subtitle: string;
  description: TrackDescription;
  align: string;
}[] = [
  {
    color: "blue",
    title: "Transit Gamification",
    subtitle: "Inbound",
    align: "sm:mr-auto",
    description: {
      paragraphs: [
        "Hundreds of thousands of people use the MBTA everyday. They endure the same predictable routine, platform waits, and unexpected friction points. For locals, transit has largely become a functional necessity rather than an enjoyable experience, while for tourists, navigating the system can feel passive and disconnected from the vibrant city above ground. Public transportation is one of Boston’s greatest shared spaces, yet the daily journey remains an untapped opportunity for connection and engagement.",
      ],
      prompt: "How can we transform the common T ride from something that is dreaded to something people can look forward to?",
      questions: [
        "What aspect of riding the T can be more exciting?",
        "How can we make the T more engaging and memorable for tourists?",
        "How can we encourage community engagement?",
        "How could we introduce this new addition to public transportation and make it widely accessible?",
        "What would incentivize Boston residents to actually use your product?",
        "How can your product make the T experience better for all riders?",
      ],
    },
  },
  {
    color: "green",
    title: "Bos(tons) of Eats and Streets",
    subtitle: "To Trains",
    align: "sm:ml-auto",
    description: {
      paragraphs: [
        "From early morning matcha runs to midnight meals and touring new parts of the city to attending local concerts, exploring Boston is what makes college here unforgettable. Yet, almost every student faces the same major hurdle: not having a car. So, we’ve learned to adapt. Whether you’re looking for cheap eats off the Orange Line, a cool spot to hang out in the city, or just that one restaurant open past 3:00am during finals week, the MBTA is how college students move.",
      ],
      prompt: "Your goal is to build a web application for college students that leverages the public transit systems of Boston to help them discover and navigate food spots, local activities, and the Boston aesthetic based on their cravings, budget, and location.",
      questions: [
        "Boston is infamous for closing early. How might your app help a student who is starving past midnight find spots that are actually open and accessible before the last train runs?",
        "Is there a way you can keep track of new trends in the Boston area?",
        "How can you determine what hobbies and activities people enjoy?",
        "How can you weigh affordability and transit distance travelled?",
        "How might your UI help a group of indecisive friends pick a specific spot without endless searching?",
      ],
    },
  },
  {
    color: "red",
    title: "Boundless Boston",
    subtitle: "Outbound",
    align: "sm:mr-auto",
    description: {
      paragraphs: [
        "No one knows Boston as well as… well the Bostonians. What makes Boston so special is the diverse community of individuals who have come together to build it. We are America’s college city after all. However, as you walk the streets, eat at new restaurants, you realize that there are some differences from your daily life that you think could drastically improve this city. Today’s the day to turn these niche original ideas into reality, building from scratch or merging different products together to create your very own concept.",
        "Add new features to your favorite parts of Boston, apply an existing feature in a novel way, or throw it into the ocean and create something completely different from anything the city has seen before. Boston is your city, push those boundaries and show us your big ideas!",
      ],
      questions: [
        "What are some popular complaints about living in Boston?",
        "What feature hasn’t been updated to fit with the modern age?",
        "What group of people is being hurt by a Boston characteristic or lack thereof?",
        "What city services are confusing or difficult to access digitally?",
        "What do newcomers to Boston struggle with the most?",
      ],
    },
  },
];

export default function TracksSection() {
  return (
    <section id="tracks" aria-label="Tracks" className="relative w-full scroll-mt-[64px] overflow-hidden bg-white px-8 py-20 font-akshar text-black lg:scroll-mt-[215px]">
      {/* Red route-line hook, per Figma node 462:334 — a large, prominent hook running
          down the left side past Track One, not a small corner accent. The source asset
          is a straight-ish diagonal that Figma's own reference code rotates/flips into
          the hook shape (-rotate-120 -scale-y-100), so that transform is required here
          too — dropping the raw asset in flat renders a plain diagonal line. Figma has
          the hook's bend align with Track One's own top edge; the old centered-in-a-tall-
          box approach put the bend down near the gap between Track One and Two instead —
          positioned directly against the section top now instead of centered. */}
      <div aria-hidden className="pointer-events-none absolute -left-16 top-8 hidden xl:block">
        <div className="relative -rotate-120 -scale-y-100" style={{ width: "17rem", height: "20.38rem" }}>
          <Image src="/images/tracks/line-red-hook.svg" alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

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

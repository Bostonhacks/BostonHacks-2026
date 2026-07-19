import Image from "next/image";

// TrackCard — FE-8. Reusable card per Figma node 462:557 ("Tracks - on click"):
// colored header bar + grey body inside a thick black border, with a train-mascot
// icon peeking out of the bottom-right corner. Colors reuse the --track-* tokens
// already pulled from this same Figma node in app/globals.css.
type TrackColor = "blue" | "green" | "red";

const HEADER_BG: Record<TrackColor, string> = {
  blue: "var(--track-blue)",
  green: "var(--track-green)",
  red: "var(--track-red)",
};

const MASCOT_SRC: Record<TrackColor, string> = {
  blue: "/images/trackcard/train-blue.svg",
  green: "/images/trackcard/train-green.svg",
  red: "/images/trackcard/train-red.svg",
};

export default function TrackCard({
  color,
  title,
  description,
}: {
  color: TrackColor;
  title: string;
  description: string;
}) {
  return (
    <div className="relative w-full max-w-sm font-akshar">
      <div
        className="relative overflow-hidden rounded-2xl border-[6px] border-black shadow-md"
        style={{ backgroundColor: "var(--track-body)" }}
      >
        <div
          className="px-6 py-4 text-center text-2xl font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: HEADER_BG[color] }}
        >
          {title}
        </div>
        <p className="px-6 py-8 text-center text-lg font-bold text-black">{description}</p>
      </div>

      <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-16" aria-hidden>
        <Image src={MASCOT_SRC[color]} alt="" fill unoptimized className="object-contain" />
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import Image from "next/image";

// Hero — FE-5. "2026 / BOSTONHACKS" title, Login + Sponsor Us CTAs with a
// marker-highlight underline, and a scroll cue, in normal document flow
// (independently responsive — Tailwind text sizes, not part of the canvas
// below). All decorative art (clouds, sparkle, route lines, RL/GL/BL badges)
// is positioned as a percentage of a fixed-aspect canvas computed directly
// from the actual Figma coordinates of node 462:125 ("top"), the same
// technique used in ThemeGraphics — see that file for the full rationale.
// Canvas native size: 2048 x 2322px, anchored at Figma point (-480, -219).
//
//   cloud A      70.75 / 53.49 / 29.25 / 10.64   (462:128)
//   cloud B      40.62 / 21.92 / 16.55 / 11.28   (462:129)
//   sparkle      80.22 / 77.48 /  7.57 /  7.36   (462:126)
//   blue line     1.01 / 19.60 / 40.43 / 35.66   (462:164)
//   red line      0.00 /  0.00 / 42.48 / 37.47   (462:168)
//   yellow line  49.12 / 39.88 / 48.24 / 60.12   (462:171)
//   RL badge     27.78 / 76.61 /  7.28 /  3.23   (462:210)
//   GL badge     27.78 / 85.49 /  7.28 /  3.23   (462:215)
//   BL badge     27.78 / 90.70 /  7.28 /  3.23   (462:220)

// Marker-highlight look via a background gradient painted behind the text itself,
// rather than an absolutely-positioned sibling (which needs its own stacking
// context to avoid rendering behind the page — background-image sidesteps that).
const HIGHLIGHT: CSSProperties = {
  backgroundImage: "linear-gradient(transparent 60%, var(--faq-answer-border) 60%)",
};

function Chevron() {
  return (
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden>
      <path d="M2 2L14 14L26 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LINES = [
  { label: "RL", color: "var(--track-red)" },
  { label: "GL", color: "var(--track-green)" },
  { label: "BL", color: "var(--track-blue)" },
];

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-white px-8 pb-20 pt-10 font-akshar text-black"
      style={{ aspectRatio: "1440 / 2322" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 90% at 0% 0%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 0% 0%, black 15%, transparent 70%)",
        }}
      />

      {/* Decorative canvas — see file header for how these percentages were derived */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: "142.22%", marginLeft: "-33.33%", aspectRatio: "2048 / 2322" }}
      >
        <div className="absolute" style={{ left: "70.75%", top: "53.49%", width: "29.25%", height: "10.64%" }}>
          <Image src="/images/hero/cloud-a.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "40.62%", top: "21.92%", width: "16.55%", height: "11.28%" }}>
          <Image src="/images/hero/cloud-b.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "80.22%", top: "77.48%", width: "7.57%", height: "7.36%" }}>
          <Image src="/images/hero/sparkle.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "1.01%", top: "19.60%", width: "40.43%", height: "35.66%" }}>
          <Image src="/images/hero/line-blue.svg" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "0%", top: "0%", width: "42.48%", height: "37.47%" }}>
          <Image src="/images/hero/line-red.svg" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "49.12%", top: "39.88%", width: "48.24%", height: "60.12%" }}>
          <Image src="/images/hero/line-yellow.svg" alt="" fill unoptimized className="object-contain object-left-top" />
        </div>
        {LINES.map((line, i) => (
          <span
            key={line.label}
            className="absolute flex items-center justify-center rounded-full text-[9px] font-bold text-white sm:text-xs"
            style={{
              left: "27.78%",
              top: `${76.61 + i * 8.88}%`,
              width: "7.28%",
              height: "3.23%",
              backgroundColor: line.color,
            }}
          >
            {line.label}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl">
        <p className="text-2xl font-bold sm:text-3xl">2026</p>
        <h1 className="font-presicav text-4xl font-bold leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">
          BOSTONHACKS
        </h1>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <a href="#login" className="inline-block text-3xl font-bold sm:text-4xl" style={HIGHLIGHT}>
            Login
          </a>
          <a href="#sponsors" className="inline-block text-3xl font-bold sm:text-4xl" style={HIGHLIGHT}>
            Sponsor Us
          </a>
        </div>

        <div aria-hidden className="mt-16 flex flex-col items-start gap-1 text-black/70">
          <Chevron />
          <Chevron />
        </div>
      </div>
    </section>
  );
}

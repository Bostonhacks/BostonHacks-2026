import type { CSSProperties } from "react";
import Image from "next/image";

// Hero — FE-5. "2026 / BOSTONHACKS" title, Login + Sponsor Us CTAs with a
// marker-highlight underline, and a scroll cue, in normal document flow
// (independently responsive — Tailwind text sizes, not part of the canvas
// below). All decorative art (clouds, sparkle, route lines, RL/GL/BL badges)
// is positioned as a percentage of a fixed-aspect canvas computed directly
// from the actual Figma coordinates of node 462:125 ("top"), the same
// technique used in ThemeGraphics — see that file for the full rationale.
//
// Figma's "top" frame starts at y=-219 (219px above the visible viewport),
// because in the source file the navbar logo shares one frame with all the
// hero artwork. Our Navbar is a separate, already-opaque component rendered
// before Hero, so that top 219px of frame space is already spoken for —
// anchoring this canvas at the frame's own origin (as an earlier version of
// this file did) double-counted it and pushed every element down by ~9% of
// the canvas height (most visibly: a huge gap between the CTAs and the
// yellow line that shouldn't exist). Anchored at Figma's actual visible-
// viewport top instead: canvas native size 2048 x 2103px, at Figma point
// (-480, 0). The red line's frame (462:168) starts at y=-219, above this
// canvas's own top, so it gets a negative top% by design — it bleeds above
// the section and is clipped by the section's own overflow-hidden, exactly
// like Figma's own viewport crop.
//
//   cloud A      70.75 / 48.64 / 29.25 / 11.75   (462:128)
//   cloud B      40.62 / 13.79 / 16.55 / 12.46   (462:129)
//   sparkle      80.22 / 75.13 /  7.57 /  8.13   (462:126)
//   blue line     1.01 / 11.22 / 40.43 / 39.37   (462:164)
//   red line      0.00 /-10.41 / 42.48 / 41.37   (462:168)
//   yellow line  49.12 / 33.62 / 48.24 / 66.38   (462:171)
//   RL badge     27.78 / 74.18 /  7.28 /  3.57   (462:210)
//   GL badge     27.78 / 83.98 /  7.28 /  3.57   (462:215)
//   BL badge     27.78 / 89.73 /  7.28 /  3.57   (462:220)

// Marker-highlight look via a background gradient painted behind the text itself,
// rather than an absolutely-positioned sibling (which needs its own stacking
// context to avoid rendering behind the page — background-image sidesteps that).
const HIGHLIGHT: CSSProperties = {
  backgroundImage: "linear-gradient(transparent 60%, var(--faq-answer-border) 60%)",
};

// RL/GL/BL are pre-drawn Figma image assets (462:210/215/220), not CSS pills + text —
// downloaded via download_assets so the hand-lettered "RL"/"GL"/"BL" glyphs render
// exactly as designed instead of an approximated small CSS label.
const LINES = [
  { label: "RL", src: "/images/hero/badge-red.svg" },
  { label: "GL", src: "/images/hero/badge-green.svg" },
  { label: "BL", src: "/images/hero/badge-blue.svg" },
];

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-white px-8 pb-20 pt-10 font-akshar text-black"
      style={{ aspectRatio: "1440 / 2103" }}
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
        style={{ width: "142.22%", marginLeft: "-33.33%", aspectRatio: "2048 / 2103" }}
      >
        {/* Soft gradient blob, per 462:160 (bottom-left ambient wash, sits behind everything else) */}
        <div
          className="absolute rounded-[40%]"
          style={{
            left: "12.99%",
            top: "33.67%",
            width: "25.78%",
            height: "36.95%",
            backgroundImage: "linear-gradient(to top, rgba(199,238,255,0.73), rgba(255,255,255,0.73))",
          }}
        />
        {/* Dashed line + dot, per 462:209 */}
        <div className="absolute" style={{ left: "23.32%", top: "59.39%", width: "16.68%", height: "2.54%", transform: "translateY(-50%)" }}>
          <Image src="/images/hero/dashed-dot.svg" alt="" fill unoptimized className="object-contain object-left" />
        </div>
        <div className="absolute" style={{ left: "70.75%", top: "48.64%", width: "29.25%", height: "11.75%" }}>
          <Image src="/images/hero/cloud-a.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "40.62%", top: "13.79%", width: "16.55%", height: "12.46%" }}>
          <Image src="/images/hero/cloud-b.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "80.22%", top: "75.13%", width: "7.57%", height: "8.13%" }}>
          <Image src="/images/hero/sparkle.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "1.01%", top: "11.22%", width: "40.43%", height: "39.37%" }}>
          <Image src="/images/hero/line-blue.svg" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "0%", top: "-10.41%", width: "42.48%", height: "41.37%" }}>
          <Image src="/images/hero/line-red.svg" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="absolute" style={{ left: "49.12%", top: "33.62%", width: "48.24%", height: "66.38%" }}>
          <Image src="/images/hero/line-yellow.svg" alt="" fill unoptimized className="object-contain object-left-top" />
        </div>
        {LINES.map((line, i) => (
          <div
            key={line.label}
            className="absolute"
            style={{
              left: "27.78%",
              top: `${[74.18, 83.98, 89.73][i]}%`,
              width: "7.28%",
              height: "3.57%",
            }}
          >
            <Image src={line.src} alt={line.label} fill unoptimized className="object-contain" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl">
        <p className="text-2xl font-bold sm:text-3xl md:text-4xl">2026</p>
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

        {/* Scroll cue, per 462:127 — the actual hand-drawn double-chevron asset
            (rotate-90 in Figma's own source, already baked into the exported bitmap),
            not a hand-authored SVG path. */}
        <div aria-hidden className="relative mt-16 h-10 w-7">
          <Image src="/images/hero/scroll-chevron.png" alt="" fill unoptimized className="object-contain" />
        </div>
      </div>
    </section>
  );
}

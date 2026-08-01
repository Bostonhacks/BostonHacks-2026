import type { CSSProperties } from "react";
import Image from "next/image";

// Hero — FE-5. Lower portion of the Figma "top" frame (node 462:125, y~530-900):
// "2026 / BOSTONHACKS" title, Login + Sponsor Us CTAs with a marker-highlight
// underline, and a scroll cue. Reuses app/globals.css tokens instead of hardcoded hex.
// Decorative art (clouds, sparkle, route-line badges) pulled from the same frame's
// hand-drawn asset set and public/images/hero/.

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

// Route-line legend badges, per the "RL"/"GL"/"BL" pills next to the Figma
// crossing-lines illustration (nodes 462:210/215/220) — reuses --track-* tokens
// instead of a raster export, matching how the rest of the site handles solid color.
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

      {/* Clouds, per Figma nodes 462:128/462:129 */}
      <div aria-hidden className="pointer-events-none absolute right-10 top-16 hidden h-[110px] w-[195px] sm:block">
        <Image src="/images/hero/cloud-a.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-24 top-72 hidden h-[150px] w-[195px] lg:block">
        <Image src="/images/hero/cloud-b.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Sparkle, per Figma node 462:126 */}
      <div aria-hidden className="pointer-events-none absolute right-72 top-80 hidden h-14 w-12 lg:block">
        <Image src="/images/hero/sparkle.png" alt="" fill unoptimized className="object-contain" />
      </div>

      <div className="mx-auto max-w-4xl">
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

      {/* Decorative yellow track curve, echoing the Figma "yellow" line motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-8 top-[260px] hidden h-24 w-24 rounded-tl-[48px] border-l-[16px] border-t-[16px] sm:block"
        style={{ borderColor: "var(--faq-answer-border)" }}
      />

      {/* Red/blue crossing route lines + RL/GL/BL legend, echoing the Figma
          subway-map corner illustration (nodes 462:164/462:168, 462:210/215/220) */}
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-8 hidden h-64 w-64 lg:block">
        <Image src="/images/hero/line-red.svg" alt="" fill unoptimized className="object-contain" />
        <Image src="/images/hero/line-blue.svg" alt="" fill unoptimized className="object-contain" />
      </div>
      <div aria-hidden className="hidden flex-col items-start gap-3 lg:absolute lg:left-4 lg:top-52 lg:flex">
        {LINES.map((line) => (
          <span
            key={line.label}
            className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ backgroundColor: line.color }}
          >
            {line.label}
          </span>
        ))}
      </div>
    </section>
  );
}

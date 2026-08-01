import type { CSSProperties } from "react";

// Hero — FE-5. Lower portion of the Figma "top" frame (node 462:125, y~530-900):
// "2026 / BOSTONHACKS" title, Login + Sponsor Us CTAs with a marker-highlight
// underline, and a scroll cue. Reuses app/globals.css tokens instead of hardcoded hex.

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
    </section>
  );
}

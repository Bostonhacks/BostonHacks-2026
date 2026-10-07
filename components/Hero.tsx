import type { CSSProperties } from "react";
import Image from "next/image";
import GridBackground from "@/components/GridBackground";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
// Hero — FE-5. "2026 / BOSTONHACKS" title, Login + Sponsor Us CTAs with a
// marker-highlight underline, and a scroll cue. All of it — decorative art
// (clouds, sparkle, route lines, RL/GL/BL badges) AND the title/CTA/chevron
// content — is positioned as a percentage of a fixed-aspect canvas computed
// directly from the actual Figma coordinates of node 462:125 ("top"), the
// same technique used in ThemeGraphics — see that file for the full
// rationale. (An earlier version left the title/CTAs in normal document flow
// as "independently responsive" — that drifted out of alignment with the
// yellow line/clouds around it, since flow position doesn't track the
// canvas's own percentage-based scaling. Content lives in its own sibling
// canvas, sized identically to the decorative one below but without
// aria-hidden/pointer-events-none, so it stays interactive/accessible.)
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
//   blue line     1.01 / 10.42 / 40.43 / 40.95   (462:164)
//   red line      0.00 /-11.63 / 42.48 / 43.79   (462:168)
//   yellow line  48.83 / 33.29 / 49.81 / 66.99   (462:171)
//   RL badge     27.78 / 74.18 /  7.28 /  3.57   (462:210)
//   GL badge     27.78 / 83.98 /  7.28 /  3.57   (462:215)
//   BL badge     27.78 / 89.73 /  7.28 /  3.57   (462:220)
//   2026         52.15 / 25.35 / 37.94 /  1.95   (462:200)
//   BOSTONHACKS  51.86 / 27.29 / 38.53 /  6.66   (462:199)
//   Login        60.01 / 37.95 /  4.83 /  1.95   (462:206)
//   Sponsor Us   71.14 / 37.95 /  9.91 /  1.95   (462:208)
//   chevron      60.89 / 44.55 /  4.64 /  6.89   (462:127)
//   Apply        53.52 / 60.01 / 14.01 /  3.99   (see below)
//   Directions   53.52 / 68.43 / 14.01 /  3.99
//   "!"          62.74 / 60.20 /  4.88 /  7.66
//
// The three route lines each get a small extra size/position correction beyond
// their nominal Figma frame box: get_design_context reports these frames with
// an "inset" (e.g. `inset-[-2.03%_0_-1.97%_0]`) meaning the actual SVG content
// intentionally overflows its own frame by a couple percent — the frame's
// rounded line-end caps extend past its mathematical bounding box. Sizing the
// container to only the nominal (smaller) frame and letting object-contain
// shrink the true asset to fit was making every line render a few percent
// thinner than Figma actually draws it. Fixed by using each SVG's true
// rendered width/height (confirmed against the downloaded source files, not
// just the frame metadata) instead of the nominal frame box.

// Marker-highlight look via a background gradient painted behind the text itself,
// rather than an absolutely-positioned sibling (which needs its own stacking
// context to avoid rendering behind the page — background-image sidesteps that).
const HIGHLIGHT: CSSProperties = {
  backgroundImage:
    "linear-gradient(transparent 60%, var(--faq-answer-border) 60%)",
};

// RL/GL/BL are pre-drawn Figma image assets (462:210/215/220), not CSS pills + text —
// downloaded via download_assets so the hand-lettered "RL"/"GL"/"BL" glyphs render
// exactly as designed instead of an approximated small CSS label.
const LINES = [
  { label: "RL", src: "/images/hero/badge-red.svg" },
  { label: "GL", src: "/images/hero/badge-green.svg" },
  { label: "BL", src: "/images/hero/badge-blue.svg" },
];

// TODO: real application URL once it exists.
const APPLY_URL = "#apply";
// Venue: George Sherman Union (GSU), BU.
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=George+Sherman+Union%2C+775+Commonwealth+Ave%2C+Boston%2C+MA+02215";

// Text is centered at textX% of the box — Apply sits a bit left of center in
// the mockup to leave room for the "!". Font size is 36px at Figma's 1440
// width, scaled with the canvas via plain vw (no clamp floor like Login's):
// the text has to stay inside a box that itself shrinks with the viewport.
const BUTTONS = [
  {
    label: "Apply",
    href: APPLY_URL,
    top: "60.01%",
    fill: "/images/hero/button-fill-yellow.png",
    text: "text-black",
    textX: 46,
    external: false,
  },
  {
    label: "Directions",
    href: DIRECTIONS_URL,
    top: "68.43%",
    fill: "/images/hero/button-fill-green.png",
    text: "text-white",
    textX: 50,
    external: true,
  },
];

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate w-full overflow-hidden bg-white px-8 pb-20 pt-10 font-akshar text-black"
      style={{ aspectRatio: "1440 / 2103" }}
    >
      <GridBackground />

      {/* Decorative canvas — see file header for how these percentages were derived */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: "142.22%",
          marginLeft: "-33.33%",
          aspectRatio: "2048 / 2103",
        }}
      >
        {/* Soft gradient blob, per 462:160 (bottom-left ambient wash, sits behind everything else) */}
        <div
          className="absolute rounded-[40%]"
          style={{
            left: "12.99%",
            top: "33.67%",
            width: "25.78%",
            height: "36.95%",
            backgroundImage:
              "linear-gradient(to top, rgba(199,238,255,0.73), rgba(255,255,255,0.73))",
          }}
        />
        {/* Dashed line + dot, per 462:209 */}
        <div
          className="absolute"
          style={{
            left: "23.32%",
            top: "59.39%",
            width: "16.68%",
            height: "2.54%",
            transform: "translateY(-50%)",
          }}
        >
          <Image
            src="/images/hero/dashed-dot.svg"
            alt=""
            fill
            unoptimized
            className="object-contain object-left"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "70.75%",
            top: "48.64%",
            width: "29.25%",
            height: "11.75%",
          }}
        >
          <Image
            src="/images/hero/cloud-a.png"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "40.62%",
            top: "13.79%",
            width: "16.55%",
            height: "12.46%",
          }}
        >
          <Image
            src="/images/hero/cloud-b.png"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "80.22%",
            top: "75.13%",
            width: "7.57%",
            height: "8.13%",
          }}
        >
          <Image
            src="/images/hero/sparkle.png"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "1.01%",
            top: "10.42%",
            width: "40.43%",
            height: "40.95%",
          }}
        >
          <Image
            src="/images/hero/line-blue.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "0%",
            top: "-11.63%",
            width: "42.48%",
            height: "43.79%",
          }}
        >
          <Image
            src="/images/hero/line-red.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <div
          className="absolute"
          style={{
            left: "48.83%",
            top: "33.29%",
            width: "49.81%",
            height: "66.99%",
          }}
        >
          <Image
            src="/images/hero/line-yellow.svg"
            alt=""
            fill
            unoptimized
            className="object-contain object-left-top"
          />
        </div>

        {/* Anchor for the Navbar's "Sign Up" station — previously had no matching
            element on the page at all, so the link/scroll-spy did nothing. Positioned
            at the blue/yellow route-line corner + cloud, per request. scroll-mt
            (mobile / desktop sticky-nav height) keeps the sticky nav from covering
            this art once scrolled into place — same value used on every other
            section anchor; Navbar.tsx reads it for both click-scroll and scroll-spy. */}
        <div
          id="signup"
          aria-hidden
          className="absolute inset-x-0 scroll-mt-[64px] lg:scroll-mt-[215px]"
          style={{ top: "30%" }}
        />
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
            <Image
              src={line.src}
              alt={line.label}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Content canvas — same size/position AND positioning scheme as the
          decorative one above (absolute, left-0 top-0 — not just the same
          width/aspect-ratio) so both stay pixel-aligned to one coordinate
          space; interactive/accessible, so not aria-hidden. An earlier
          version left this as position:relative — same size, but still in
          normal document flow, which let its 142%-wide box contribute real
          layout height to the section and misaligned/clipped the text it
          contains. Text boxes below use only left/top + whitespace-nowrap,
          no explicit width — Figma's own text-box widths were sized for HVD
          Poster Clean/Helvetica's specific glyph metrics, which don't match
          the substitute fonts used here (see below), so constraining to
          that width risked clipping; sizing to content is safe since these
          are single unbreakable words/short phrases. Font sizes use clamp()
          rather than Tailwind's breakpoint classes because this now scales
          continuously with the canvas's own percentage-based width, same as
          FaqSection's "FAQs" heading and ThemeGraphics' badge text — a
          breakpoint jump would drift out of size-sync with the canvas
          between breakpoints. "2026"/Login/Sponsor Us ranges preserve the
          same min/max this content used before (text-2xl/4xl, text-3xl/4xl).
          Fonts, per Figma: those three are plain Helvetica:Bold
          (font-helvetica overrides the section's inherited font-akshar) —
          not Akshar/Presicav. BOSTONHACKS is set in "HVD Poster Clean", a
          commercial font (HVD Fonts) — not something that can be downloaded
          or embedded without a license, and not already in public/fonts.
          A live-text substitute (font-presicav) risked clipping regardless
          of size: Figma's own layout has BOSTONHACKS ending only ~5% of the
          1440px reference viewport from its right edge (x=582..1371 of
          1440), a margin that only works with HVD Poster Clean's actual
          (narrower) letterforms. Provided directly as a pre-rendered image
          (public/images/hero/bostonhacks-title.png, actually set in HVD
          Poster Clean) instead — sidesteps the font-licensing problem
          entirely and matches Figma exactly, pixel-for-pixel, rather than
          approximating it. */}
      <div
        className="absolute left-0 top-0"
        style={{
          width: "142.22%",
          marginLeft: "-33.33%",
          aspectRatio: "2048 / 2103",
        }}
      >
        <p
          className="absolute whitespace-nowrap font-helvetica font-bold leading-none"
          style={{
            left: "52.15%",
            top: "25.35%",
            fontSize: "clamp(13px, 2.5vw, 36px)",
          }}
        >
          2026
        </p>
        <h1
          className="absolute"
          style={{
            left: "51.86%",
            top: "28%",
            width: "38.53%",
            aspectRatio: "569 / 70",
          }}
        >
          <Image
            src="/images/hero/bostonhacks-title.png"
            alt="BOSTONHACKS"
            fill
            unoptimized
            className="object-contain object-left"
          />
        </h1>

        <Link
          href="/login"
          className="absolute inline-block whitespace-nowrap font-helvetica font-bold"
          style={{
            left: "60.01%",
            top: "37.95%",
            fontSize: "clamp(15px, 2.5vw, 36px)",
            ...HIGHLIGHT,
          }}
        >
          Login
        </Link>
        <a
          href="#sponsors"
          className="absolute inline-block whitespace-nowrap font-helvetica font-bold"
          style={{
            left: "71.14%",
            top: "37.95%",
            fontSize: "clamp(15px, 2.5vw, 36px)",
            ...HIGHLIGHT,
          }}
        >
          Sponsor Us
        </a>

        {/* Scroll cue, per 462:127 — the actual hand-drawn double-chevron asset
            (rotate-90 in Figma's own source, already baked into the exported bitmap),
            not a hand-authored SVG path. */}
        <div
          aria-hidden
          className="absolute"
          style={{
            left: "60.89%",
            top: "44.55%",
            width: "4.64%",
            height: "6.89%",
          }}
        >
          <Image
            src="/images/hero/scroll-chevron.png"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        {/* Apply / Directions / "!" scale up together on small screens. Everything in
            this canvas shrinks with the viewport, which left these at ~78x23px with
            ~10px text on a phone — too small to read or tap. Scaling from Apply's own
            top-left corner keeps the group anchored where the design puts it next to
            the yellow line. The wrapper spans the canvas, so it's click-through and
            only the buttons themselves take pointer events. */}
        <div className="pointer-events-none absolute inset-0 origin-[53.52%_60.01%] scale-[1.8] sm:scale-[1.35] md:scale-100 [&>a]:pointer-events-auto [&>button]:pointer-events-auto">
          {BUTTONS.map((b) =>
            b.label === "Apply" ? (
              <ApplyButton
                key={b.label}
                top={b.top}
                fill={b.fill}
                text={b.text}
                textX={b.textX}
              />
            ) : (
              <a
                key={b.label}
                href={b.href}
                {...(b.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="absolute block"
                style={{
                  left: "53.52%",
                  top: b.top,
                  width: "14.01%",
                  height: "3.99%",
                }}
              >
                <span
                  aria-hidden
                  className="absolute"
                  style={{
                    left: "3.14%",
                    top: "22.62%",
                    width: "98.61%",
                    height: "77.38%",
                  }}
                >
                  <Image src={b.fill} alt="" fill unoptimized />
                </span>
                <Image
                  src="/images/hero/button-outline.png"
                  alt=""
                  fill
                  unoptimized
                />
                <span
                  className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-helvetica font-bold ${b.text}`}
                  style={{ left: `${b.textX}%`, fontSize: "2.5vw" }}
                >
                  {b.label}
                </span>
              </a>
            ),
          )}

          {/* Hand-drawn "!" leaning on the Apply box — after the buttons so it paints over the outline.
              (Was accidentally swapped for a second <GridBackground /> in e3e5a4f; that duplicate
              sat inside this wider, offset canvas so its lines didn't align with the section's
              grid. The single grid is now the section's first child, above.) */}
          <div aria-hidden className="pointer-events-none absolute" style={{ left: "62.74%", top: "60.2%", width: "4.88%", height: "7.66%" }}>
            <Image src="/images/hero/exclamation.png" alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

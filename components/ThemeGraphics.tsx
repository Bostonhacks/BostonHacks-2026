import Image from "next/image";

// ThemeGraphics — FE-7 (+ the FE-6 badge, folded in here for exact alignment).
// Every element below is positioned as a percentage of a single fixed-aspect
// canvas, computed directly from the actual Figma coordinates (node 462:124),
// not eyeballed spacing. The canvas's native size is 2322.95 x 2769.4px,
// anchored at Figma point (-210, 2167) — the top-left of the whole "theme"
// composition (leftmost cloud to the bottom of the train scene). Because the
// canvas is wider than one viewport (elements intentionally bleed off both
// edges), it's rendered at 161.32% of the section width with a -14.58%
// left margin so that Figma x=0..1440 (the visible viewport at desktop)
// lines up with the section's own left/right edges — this holds at any
// viewport width, so relative positions never drift between breakpoints.
//
// Element percentages (left/top/width/height, as % of the canvas):
//   badge        20.41 /  2.53 / 25.05 /  4.30   (462:537, "This year's theme is…")
//   cloud A       7.10 /  7.37 / 30.26 / 10.47   (462:460)
//   cloud B      48.69 /  0.00 / 19.80 / 12.85   (462:461)
//   yellow box   27.29 / 11.23 / 29.53 / 17.04   (462:479/462:480)
//   CITGO        55.85 /  5.71 / 13.80 / 10.79   (462:481)
//   ant          18.33 / 24.93 / 16.47 /  9.50   (462:506)
//   blocks       48.67 / 21.96 / 18.94 / 12.64   (462:525)
//   green line   60.10 / 34.81 / 39.90 / 38.35   (462:539)
//   train scene   0.00 / 42.93 / 83.46 / 57.07   (462:225)
export default function ThemeGraphics({ text }: { text: string }) {
  return (
    <section aria-label="Theme" className="relative isolate w-full overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Fixed-aspect canvas, scaled fluidly to the section width via percentages. */}
      <div
        className="relative"
        style={{ width: "161.32%", marginLeft: "-14.58%", aspectRatio: "2322.95 / 2769.4" }}
      >
        {/* Theme badge, per 462:537/462:536/462:538 */}
        <div
          className="absolute flex items-center justify-center whitespace-nowrap rounded-md px-[2%] text-center font-bold shadow-md"
          style={{
            left: "20.41%",
            top: "2.53%",
            width: "25.05%",
            height: "4.30%",
            backgroundColor: "#D6D6D6",
            // 36px in Figma (462:538) / 2322.95px canvas width, scaled by the canvas's
            // own 161.32vw render width — reaches exactly 36px at a 1440px viewport.
            // On phones it floors at 12px but never past 3.1vw, which is what still
            // fits the shrinking badge (a flat 12px floor wrapped out of it at 320px).
            fontSize: "max(min(3.1vw, 12px), min(2.5vw, 36px))",
          }}
        >
          {text}
          <Image
            src="/images/theme/badge-border.png"
            alt=""
            fill
            unoptimized
            className="pointer-events-none object-fill"
          />
        </div>

        {/* Clouds, per 462:460/462:461 */}
        <div className="pointer-events-none absolute" style={{ left: "7.10%", top: "7.37%", width: "30.26%", height: "10.47%" }}>
          <Image src="/images/theme/cloud-a.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="pointer-events-none absolute" style={{ left: "48.69%", top: "0%", width: "19.80%", height: "12.85%" }}>
          <Image src="/images/theme/cloud-b.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Squiggle line cluster (red/blue/yellow/green zigzags + thin hand-drawn
            horizontal lines), per 462:543 "Abstract View V 1" — previously missing
            entirely. Figma's own reference renders this via object-cover from a raw
            source image whose aspect ratio already matches this box (0.7077 either
            way), so it's a plain uniform-scale fill, not a crop. */}
        <div className="pointer-events-none absolute" style={{ left: "55.53%", top: "44.24%", width: "46.22%", height: "54.78%" }}>
          <Image src="/images/theme/squiggle-lines.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Small pen-flourish doodles, per 462:523/462:524 — previously missing. */}
        <div className="pointer-events-none absolute" style={{ left: "48.90%", top: "4.84%", width: "10.85%", height: "5.06%" }}>
          <Image src="/images/theme/doodle-a.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="pointer-events-none absolute" style={{ left: "14.42%", top: "22.60%", width: "10.94%", height: "5.09%" }}>
          <Image src="/images/theme/doodle-b.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Green route line, per 462:539 — was using a badly-cropped 254x1112 PNG
            (a stray/incorrect export, similar to the countdown-squiggle bug) that
            only showed a sliver of the actual line with a single station dot,
            reading as "missing" at a glance. The correct asset is the node's own
            source SVG, 926.948 x 1111.49, with two station dots. */}
        <div className="pointer-events-none absolute" style={{ left: "60.10%", top: "34.81%", width: "39.90%", height: "40.13%" }}>
          <Image src="/images/theme/line-green.svg" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* CITGO, per 462:481 */}
        <div className="pointer-events-none absolute" style={{ left: "55.85%", top: "5.71%", width: "13.80%", height: "10.79%" }}>
          <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Yellow MBTA box, per 462:479/462:480. A flat CSS rect can never cleanly fill a
            hand-drawn wavy outline — no matter how the rect is sized/positioned, the wave
            dips inside the rect's straight edge in some spots (yellow overshoots past the
            border) and bulges outside it in others (a white gap shows), and that's exactly
            what earlier attempts here showed. Fixed at the asset level instead: the border
            PNG's own transparent interior was flood-filled with the fill color (after first
            stripping a baked-in gray anti-aliasing halo the source export had — a straight
            alpha-based fill left a visible light ring around the stroke), producing one
            combined image where the fill and outline are pixel-identical to the same shape. */}
        <div className="pointer-events-none absolute" style={{ left: "27.29%", top: "11.23%", width: "29.53%", height: "17.04%" }}>
          <Image
            src="/images/theme/mbta-box-filled.png"
            alt=""
            fill
            unoptimized
            className="pointer-events-none object-fill"
          />
          {/* Theme name "BOSTON BOUND" (replaced the "MBTA" + "+ BOSTON" lettering).
              The artwork (public/images/theme/boston-bound.png, 594x403) arrives
              already tilted and outlined, with transparent letter counters so the
              yellow shows through. It's ~74% of the box's width, centered (box is
              686x472 at the canvas's native size). The heading text stays in the DOM
              for screen readers. */}
          <div className="absolute" style={{ left: "13%", top: "13.5%", width: "74%", height: "73%" }}>
            <Image src="/images/theme/boston-bound.png" alt="" fill unoptimized className="object-contain" />
          </div>
          <h2 className="sr-only">Boston Bound</h2>
        </div>

        {/* Ant/crab doodle, per 462:506 */}
        <div className="pointer-events-none absolute z-10" style={{ left: "18.33%", top: "24.93%", width: "16.47%", height: "9.50%" }}>
          <Image src="/images/theme/ant.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Stacked blocks, per 462:525 */}
        <div className="pointer-events-none absolute z-10" style={{ left: "48.67%", top: "21.96%", width: "18.94%", height: "12.64%" }}>
          <Image src="/images/theme/blocks.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Train illustration, per 462:225 — given a gentle idle "chug" bob (bounce +
            slight rock) instead of sitting perfectly still, since it's a train that's
            visually mid-track. Kept small/subtle: this is a single flattened raster
            (the source vectors aren't exported as separate wheel/body layers), so a
            bounce is the honest amount of motion this asset can carry without faking
            detail Figma doesn't provide. */}
        <div
          className="theme-train pointer-events-none absolute"
          style={{ left: "0%", top: "42.93%", width: "83.46%", height: "57.07%" }}
        >
          <Image src="/images/theme/train.png" alt="" fill unoptimized className="object-contain object-left-bottom" />
        </div>
        <style>{`
          @keyframes themeTrainChug {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25%      { transform: translateY(-1%) rotate(-0.3deg); }
            50%      { transform: translateY(0) rotate(0deg); }
            75%      { transform: translateY(-0.5%) rotate(0.25deg); }
          }
          .theme-train { animation: themeTrainChug 3.2s ease-in-out infinite; transform-origin: left bottom; }
          @media (prefers-reduced-motion: reduce) { .theme-train { animation: none; } }
        `}</style>
      </div>
    </section>
  );
}

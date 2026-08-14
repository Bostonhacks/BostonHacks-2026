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
//   MBTA         32.60 / 15.09 / 23.16 /  8.54   (462:491)
//   + BOSTON     36.07 / 22.27 /  9.22 /  2.66   (462:498)
//   CITGO        55.85 /  5.71 / 13.80 / 10.79   (462:481)
//   ant          18.33 / 24.93 / 16.47 /  9.50   (462:506)
//   blocks       48.67 / 21.96 / 18.94 / 12.64   (462:525)
//   green line   60.10 / 34.81 / 39.90 / 38.35   (462:539)
//   train scene   0.00 / 42.93 / 83.46 / 57.07   (462:225)
export default function ThemeGraphics({ text }: { text: string }) {
  return (
    <section aria-hidden className="relative isolate w-full overflow-hidden bg-white">
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
          className="absolute flex items-center justify-center rounded-md px-[2%] text-center font-bold shadow-md"
          style={{
            left: "20.41%",
            top: "2.53%",
            width: "25.05%",
            height: "4.30%",
            backgroundColor: "#D6D6D6",
            // 36px in Figma (462:538) / 2322.95px canvas width, scaled by the canvas's
            // own 161.32vw render width — reaches exactly 36px at a 1440px viewport.
            fontSize: "clamp(12px, 2.5vw, 36px)",
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

        {/* Green route line, per 462:539 */}
        <div className="pointer-events-none absolute" style={{ left: "60.10%", top: "34.81%", width: "39.90%", height: "38.35%" }}>
          <Image src="/images/theme/line-green.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* CITGO, per 462:481 */}
        <div className="pointer-events-none absolute" style={{ left: "55.85%", top: "5.71%", width: "13.80%", height: "10.79%" }}>
          <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Yellow MBTA box, per 462:479/462:480, with MBTA (462:491) and
            "+ BOSTON" (462:498) inside at their own exact coordinates */}
        <div
          className="absolute rounded-lg"
          style={{ left: "27.29%", top: "11.23%", width: "29.53%", height: "17.04%", backgroundColor: "#F7DD04" }}
        >
          <Image
            src="/images/theme/mbta-box-border.png"
            alt=""
            fill
            unoptimized
            className="pointer-events-none object-fill"
          />
        </div>
        <div className="pointer-events-none absolute -rotate-2" style={{ left: "32.60%", top: "15.09%", width: "23.16%", height: "8.54%" }}>
          <Image src="/images/theme/mbta.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="pointer-events-none absolute" style={{ left: "36.07%", top: "22.27%", width: "9.22%", height: "2.66%" }}>
          <Image src="/images/theme/plus-boston.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Ant/crab doodle, per 462:506 */}
        <div className="pointer-events-none absolute z-10" style={{ left: "18.33%", top: "24.93%", width: "16.47%", height: "9.50%" }}>
          <Image src="/images/theme/ant.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Stacked blocks, per 462:525 */}
        <div className="pointer-events-none absolute z-10" style={{ left: "48.67%", top: "21.96%", width: "18.94%", height: "12.64%" }}>
          <Image src="/images/theme/blocks.png" alt="" fill unoptimized className="object-contain" />
        </div>

        {/* Train illustration, per 462:225 */}
        <div className="pointer-events-none absolute" style={{ left: "0%", top: "42.93%", width: "83.46%", height: "57.07%" }}>
          <Image src="/images/theme/train.png" alt="" fill unoptimized className="object-contain object-left-bottom" />
        </div>
      </div>
    </section>
  );
}

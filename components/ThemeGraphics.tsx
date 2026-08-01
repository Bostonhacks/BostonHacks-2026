import Image from "next/image";

// ThemeGraphics — FE-7, expanded to include every hand-drawn asset from the
// Figma "theme" composition (node 462:225 plus the surrounding standalone
// artwork between the theme badge and the train scene): CITGO (462:481), a
// yellow wobbly-bordered box (462:479/462:480) holding the MBTA wordmark
// (462:491) + "+ BOSTON" (462:498), the ant/crab doodle (462:506) and stacked
// blocks (462:525) overlapping its bottom corners, two extra clouds
// (462:460/462:461), the green route line (462:539), the "Abstract View"
// yarn-tangle background (462:543), and the train illustration (462:225).
// All exported PNGs live in public/images/theme/. Blueprint-grid background
// reuses the pattern already established in Hero and ScheduleGrid.
export default function ThemeGraphics() {
  return (
    <section aria-hidden className="relative isolate h-[760px] w-full overflow-hidden bg-white sm:h-[900px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 90% at 0% 100%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 0% 100%, black 15%, transparent 70%)",
        }}
      />

      {/* Abstract View yarn-tangle, per 462:543 — faint background accent on the right edge */}
      <div className="pointer-events-none absolute -right-10 top-24 hidden h-[520px] w-32 opacity-70 lg:block">
        <Image src="/images/theme/abstract-view.png" alt="" fill unoptimized className="object-cover" />
      </div>

      {/* Green route line, per 462:539 */}
      <div className="pointer-events-none absolute right-24 top-8 hidden h-72 w-16 lg:block">
        <Image src="/images/theme/line-green.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* CITGO, per 462:481 */}
      <div className="pointer-events-none absolute right-8 top-8 h-[78px] w-[84px] rotate-3 sm:right-16 sm:top-10 sm:h-[104px] sm:w-[112px]">
        <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Yellow MBTA box (462:479/462:480) with the ant (462:506) and blocks
          (462:525) overlapping its bottom corners, per the reference composition */}
      <div
        className="relative isolate mx-auto mt-24 h-[220px] w-[280px] rounded-lg sm:mt-16 sm:h-[280px] sm:w-[380px]"
        style={{ backgroundColor: "#F7DD04" }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="relative h-[62px] w-[138px] -rotate-2 sm:h-[80px] sm:w-[178px]">
            <Image src="/images/theme/mbta.png" alt="" fill unoptimized className="object-contain" />
          </div>
          <div className="relative h-6 w-24 sm:h-8 sm:w-32">
            <Image src="/images/theme/plus-boston.png" alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        <Image
          src="/images/theme/mbta-box-border.png"
          alt=""
          fill
          unoptimized
          className="pointer-events-none object-fill"
        />

        <div className="pointer-events-none absolute -bottom-10 -left-10 z-10 h-24 w-32 sm:-bottom-12 sm:-left-12 sm:h-32 sm:w-44">
          <Image src="/images/theme/ant.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="pointer-events-none absolute -bottom-8 -right-6 z-10 hidden h-28 w-24 sm:-bottom-10 sm:-right-8 sm:block sm:h-36 sm:w-32">
          <Image src="/images/theme/blocks.png" alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Two extra clouds, per 462:460/462:461 */}
      <div className="pointer-events-none absolute left-8 top-10 hidden h-16 w-36 md:block">
        <Image src="/images/theme/cloud-a.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div className="pointer-events-none absolute right-1/3 top-56 hidden h-20 w-24 lg:block">
        <Image src="/images/theme/cloud-b.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Train illustration, per 462:225 */}
      <div className="pointer-events-none absolute bottom-0 -left-20 h-[340px] w-[360px] sm:-left-16 sm:h-[440px] sm:w-[460px]">
        <Image src="/images/theme/train.png" alt="" fill unoptimized className="object-contain" />
      </div>
    </section>
  );
}

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
// Everything renders at every breakpoint (scaled down, not hidden) — an
// earlier version hid most of this below sm/md/lg to dodge mobile overflow,
// which made the section nearly bare on phones.
export default function ThemeGraphics() {
  return (
    <section aria-hidden className="relative isolate h-[700px] w-full overflow-hidden bg-white sm:h-[820px] lg:h-[900px]">
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

      {/* Abstract View yarn-tangle, per 462:543 — background accent on the right edge */}
      <div className="pointer-events-none absolute -right-6 top-20 h-[340px] w-20 opacity-60 sm:top-24 sm:h-[420px] sm:w-24 lg:h-[520px] lg:w-32 lg:opacity-70">
        <Image src="/images/theme/abstract-view.png" alt="" fill unoptimized className="object-cover" />
      </div>

      {/* Green route line, per 462:539 */}
      <div className="pointer-events-none absolute right-12 top-2 h-44 w-10 sm:right-20 sm:h-56 sm:w-14 lg:right-24 lg:top-8 lg:h-72 lg:w-16">
        <Image src="/images/theme/line-green.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* CITGO, per 462:481 */}
      <div className="pointer-events-none absolute right-4 top-4 h-[54px] w-[58px] rotate-3 sm:right-16 sm:top-10 sm:h-[104px] sm:w-[112px]">
        <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Yellow MBTA box (462:479/462:480) with the ant (462:506) and blocks
          (462:525) overlapping its bottom corners, per the reference composition */}
      <div className="relative mx-auto mt-24 h-[200px] w-[260px] sm:mt-16 sm:h-[280px] sm:w-[380px]">
        <div className="absolute inset-0 -z-10 rounded-lg" style={{ backgroundColor: "#F7DD04" }} />
        <div className="flex h-full flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="relative h-[54px] w-[122px] -rotate-2 sm:h-[80px] sm:w-[178px]">
            <Image src="/images/theme/mbta.png" alt="" fill unoptimized className="object-contain" />
          </div>
          <div className="relative h-5 w-20 sm:h-8 sm:w-32">
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

        <div className="pointer-events-none absolute -bottom-8 -left-8 z-10 h-20 w-28 sm:-bottom-12 sm:-left-12 sm:h-32 sm:w-44">
          <Image src="/images/theme/ant.png" alt="" fill unoptimized className="object-contain" />
        </div>
        <div className="pointer-events-none absolute -bottom-7 -right-5 z-10 h-20 w-16 sm:-bottom-10 sm:-right-8 sm:h-36 sm:w-32">
          <Image src="/images/theme/blocks.png" alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Two extra clouds, per 462:460/462:461 */}
      <div className="pointer-events-none absolute left-4 top-6 h-12 w-28 sm:left-8 sm:top-10 sm:h-16 sm:w-36">
        <Image src="/images/theme/cloud-a.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div className="pointer-events-none absolute right-16 top-44 h-14 w-16 sm:top-48 lg:right-1/3 lg:top-56 lg:h-20 lg:w-24">
        <Image src="/images/theme/cloud-b.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Train illustration, per 462:225 */}
      <div className="pointer-events-none absolute bottom-0 -left-12 h-[260px] w-[280px] sm:-left-16 sm:h-[440px] sm:w-[460px]">
        <Image src="/images/theme/train.png" alt="" fill unoptimized className="object-contain" />
      </div>
    </section>
  );
}

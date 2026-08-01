import Image from "next/image";

// ThemeGraphics — FE-7, expanded to include every hand-drawn asset from the
// Figma "theme" composition (node 462:225 plus the surrounding standalone
// artwork between the theme badge and the train scene): CITGO (462:481), MBTA
// wordmark (462:491) + "+ BOSTON" (462:498), the ant/crab doodle (462:506),
// the stacked blocks (462:525), two extra clouds (462:460/462:461), the green
// route line (462:539), the "Abstract View" yarn-tangle background (462:543),
// and the train illustration (462:225). All exported PNGs live in
// public/images/theme/. Blueprint-grid background reuses the pattern already
// established in Hero and ScheduleGrid.
export default function ThemeGraphics() {
  return (
    <section aria-hidden className="relative isolate h-[700px] w-full overflow-hidden bg-white sm:h-[820px]">
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

      {/* MBTA + "+ BOSTON" + CITGO, per 462:491/462:498/462:481 */}
      <div className="pointer-events-none absolute inset-x-0 top-8 flex items-start justify-between px-8 sm:top-10 sm:px-16">
        <div>
          <div className="relative h-[62px] w-[138px] -rotate-2 sm:h-[80px] sm:w-[178px]">
            <Image src="/images/theme/mbta.png" alt="" fill unoptimized className="object-contain" />
          </div>
          <div className="relative mt-2 h-6 w-24 sm:h-8 sm:w-32">
            <Image src="/images/theme/plus-boston.png" alt="" fill unoptimized className="object-contain" />
          </div>
        </div>
        <div className="relative h-[78px] w-[84px] rotate-3 sm:h-[104px] sm:w-[112px]">
          <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
        </div>
      </div>

      {/* Ant/crab doodle + stacked blocks, per 462:506/462:525 */}
      <div className="pointer-events-none absolute left-6 top-40 h-24 w-32 sm:left-10 sm:top-48 sm:h-32 sm:w-44">
        <Image src="/images/theme/ant.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div className="pointer-events-none absolute right-8 top-44 hidden h-28 w-24 sm:block sm:right-16 sm:top-52 sm:h-36 sm:w-32">
        <Image src="/images/theme/blocks.png" alt="" fill unoptimized className="object-contain" />
      </div>

      {/* Two extra clouds, per 462:460/462:461 */}
      <div className="pointer-events-none absolute left-1/3 top-10 hidden h-16 w-36 md:block">
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

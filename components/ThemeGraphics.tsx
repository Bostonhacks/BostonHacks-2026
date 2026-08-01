import Image from "next/image";

// ThemeGraphics — FE-7. Purely decorative art per Figma nodes 462:481 (CITGO),
// 462:491 (MBTA wordmark), 462:225 (train illustration) — the Kenmore Square /
// Green Line motif behind "This year's theme is...". Exported PNGs already live
// in public/images/theme/. Blueprint-grid background reuses the pattern already
// established in Hero and ScheduleGrid.
export default function ThemeGraphics() {
  return (
    <section
      aria-hidden
      className="relative isolate h-[420px] w-full overflow-hidden bg-white sm:h-[520px]"
    >
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

      <div className="pointer-events-none absolute -bottom-12 -left-20 h-[340px] w-[360px] sm:-bottom-16 sm:-left-16 sm:h-[440px] sm:w-[460px]">
        <Image src="/images/theme/train.png" alt="" fill unoptimized className="object-contain" />
      </div>

      <div className="pointer-events-none absolute left-8 top-10 h-[62px] w-[138px] -rotate-2 sm:left-16 sm:top-14 sm:h-[80px] sm:w-[178px]">
        <Image src="/images/theme/mbta.png" alt="" fill unoptimized className="object-contain" />
      </div>

      <div className="pointer-events-none absolute right-8 top-8 h-[78px] w-[84px] rotate-3 sm:right-16 sm:top-10 sm:h-[104px] sm:w-[112px]">
        <Image src="/images/theme/citgo.png" alt="" fill unoptimized className="object-contain" />
      </div>
    </section>
  );
}

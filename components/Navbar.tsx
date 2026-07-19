import Image from "next/image";

// ponytail: static data, no state -> stays a server component.
type Station = { label: string; href: string; button?: boolean };

const STATIONS: Station[] = [
  { label: "Sign Up", href: "#signup", button: true },
  { label: "Tracks", href: "#tracks" },
  { label: "Schedule", href: "#schedule" },
  { label: "FAQs", href: "#faq" },
  { label: "Sponsors", href: "#sponsors" },
];

export default function Navbar() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm"
    >
      {/* ---------- Desktop: MBTA subway-line strip ---------- */}
      <div className="relative mx-auto hidden h-[190px] max-w-[1440px] px-6 md:block">
        {/* The horizontal track: stacked strokes (outer light + inner dark) */}
        <div className="pointer-events-none absolute inset-x-0 top-[46px] h-[18px]">
          <div className="absolute inset-x-0 top-0 h-[18px] bg-gray-300" />
          <div className="absolute inset-x-0 top-[6px] h-[6px] bg-gray-500" />
        </div>

        {/* Train pill riding the line near the left */}
        <div className="absolute left-[120px] top-[36px] flex h-[40px] w-[110px] -rotate-6 items-center gap-3 rounded-[38px] border-[3px] border-black bg-white px-4 shadow-sm">
          <span className="h-3.5 w-3.5 rounded-full bg-black" />
          <span className="h-1.5 flex-1 rounded-full bg-gray-200" />
        </div>

        {/* Station dot (interchange) on the line */}
        <div className="absolute left-[280px] top-[40px] h-[30px] w-[30px] rounded-full border-[3px] border-black bg-white" />

        {/* Logo bottom-left, hanging off the line */}
        <a href="#top" aria-label="BostonHacks home" className="absolute left-[70px] top-[110px]">
          <Image
            src="/images/navbar/logo.svg"
            alt="BostonHacks"
            width={70}
            height={60}
            priority
          />
        </a>

        {/* Stations + diagonal labels, spread across the right two-thirds */}
        <ul className="absolute right-6 top-0 flex w-[62%] justify-between">
          {STATIONS.map((s) => (
            <li key={s.href} className="flex flex-col items-center">
              {/* Station box straddling the track */}
              <a
                href={s.href}
                aria-label={s.label}
                className={`block h-[130px] w-[46px] rounded-[22px] border-2 shadow-sm transition-colors ${
                  s.button
                    ? "border-track-red bg-track-red hover:brightness-95"
                    : "border-track-body bg-white hover:border-track-blue"
                }`}
              />
              {/* Diagonal −45° hanging label */}
              <a
                href={s.href}
                className={`mt-6 origin-top-left -rotate-45 whitespace-nowrap font-akshar text-2xl font-bold tracking-wide transition-colors ${
                  s.button
                    ? "text-track-red hover:text-track-red/80"
                    : "text-black hover:text-track-blue"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Mobile: simple track bar + wrapped links ---------- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 border-b-2 border-gray-300 px-4 py-3">
          <Image
            src="/images/navbar/logo.svg"
            alt="BostonHacks"
            width={40}
            height={34}
            priority
          />
          <div className="relative h-[10px] flex-1">
            <div className="absolute inset-x-0 top-0 h-[10px] rounded bg-gray-300" />
            <div className="absolute inset-x-0 top-[3px] h-[4px] bg-gray-500" />
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-2 px-4 py-3">
          {STATIONS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className={`inline-block rounded-full border-2 px-4 py-1.5 font-akshar text-lg font-bold ${
                  s.button
                    ? "border-track-red bg-track-red text-white"
                    : "border-track-body bg-white text-black"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

import Image from "next/image";

// Navbar — FE-4. MBTA subway-line top strip: a thick grey track band with dark
// inner rails, a black-outlined train pill on the left, the BostonHacks hatch logo,
// five identical grey "door" station markers straddling the track, and diagonal
// −45° station labels hanging below (Sign Up, Tracks, Schedule, FAQs, Sponsors).
// ponytail: static data, no state -> stays a server component.
type Station = { label: string; href: string };

const STATIONS: Station[] = [
  { label: "Sign Up", href: "#signup" },
  { label: "Tracks", href: "#tracks" },
  { label: "Schedule", href: "#schedule" },
  { label: "FAQs", href: "#faq" },
  { label: "Sponsors", href: "#sponsors" },
];

export default function Navbar() {
  return (
    <nav aria-label="Primary" className="relative w-full bg-white">
      {/* ---------- Desktop: MBTA subway-line strip ---------- */}
      <div className="relative mx-auto hidden h-[210px] max-w-[1440px] px-8 md:block">
        {/* Thick grey track band with two darker inner rails, spanning full width */}
        <div className="pointer-events-none absolute inset-x-0 top-[40px] h-[46px]" aria-hidden>
          <div className="absolute inset-0 bg-ms-gray" />
          <div className="absolute inset-x-0 top-[10px] h-[5px] bg-ms-gray-darker" />
          <div className="absolute inset-x-0 top-[30px] h-[5px] bg-ms-gray-darker" />
        </div>

        {/* Train pill riding the line, near the left */}
        <div className="absolute left-[150px] top-[42px] flex h-[42px] w-[120px] items-center rounded-[40px] border-[5px] border-black bg-white px-4 shadow-sm">
          <span aria-hidden className="mx-auto h-4 w-4 rounded-full bg-black" />
        </div>

        {/* Logo hanging below-left */}
        <a href="#top" aria-label="BostonHacks home" className="absolute left-[110px] top-[112px] transition-transform hover:-translate-y-0.5">
          <Image src="/images/navbar/logo.svg" alt="BostonHacks" width={78} height={67} priority unoptimized />
        </a>

        {/* Five grey door-stations straddling the track, spread across the right ~64% */}
        <ul className="absolute right-8 top-[18px] grid w-[64%] grid-cols-5 justify-items-center">
          {STATIONS.map((s) => (
            <li key={s.href} className="flex flex-col items-center">
              <a
                href={s.href}
                className="group flex flex-col items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue"
              >
                {/* Station "door": white center, thick light-grey border (reads as grey) */}
                <span
                  aria-hidden
                  className="block h-[92px] w-[48px] rounded-[22px] border-[16px] border-ms-gray bg-white shadow-sm transition-colors group-hover:border-track-blue"
                />
                {/* Diagonal −45° hanging label */}
                <span className="mt-8 -rotate-45 whitespace-nowrap font-akshar text-xl font-bold tracking-wide text-black transition-colors group-hover:text-track-blue">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Mobile: simple track bar + wrapped links ---------- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 border-b-4 border-ms-gray px-4 py-3">
          <Image src="/images/navbar/logo.svg" alt="BostonHacks" width={44} height={38} priority unoptimized />
          <div className="relative h-[14px] flex-1" aria-hidden>
            <div className="absolute inset-x-0 top-0 h-[14px] rounded bg-ms-gray" />
            <div className="absolute inset-x-0 top-[5px] h-[4px] bg-ms-gray-darker" />
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-2 px-4 py-3">
          {STATIONS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="inline-block rounded-full border-[3px] border-ms-gray bg-white px-4 py-1.5 font-akshar text-lg font-bold text-black"
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

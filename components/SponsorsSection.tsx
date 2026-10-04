// SponsorsSection — placeholder sponsors showcase. No Figma frame exists for this
// section in the wireframe file (462:124 has no "sponsors" node) — Navbar's
// "Sponsors" station and Hero's "Sponsor Us" CTA both already pointed at
// #sponsors with nothing there to land on (same class of dead-anchor bug as
// Sign Up), so this both adds the section and fixes those two links. Built to
// match the rest of the site's established visual language (blueprint grid,
// Akshar font, dashed/bordered placeholder treatment) rather than a specific
// Figma spec, since there isn't one. Add sponsors to SPONSORS as they confirm —
// logo files live in public/images/sponsors (width/height = the logo's native
// aspect ratio; it's scaled to fit the card).
import Image from "next/image";

const SPONSORS = [
  {
    name: "Seqera",
    href: "https://seqera.io",
    logo: "/images/sponsors/seqera.svg",
    width: 387,
    height: 79,
  },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      aria-label="Sponsors"
      className="relative isolate w-full scroll-mt-[140px] overflow-hidden bg-white px-8 py-20 font-akshar text-black md:scroll-mt-[215px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
            "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
          backgroundSize: "72px 72px",
        }}
      />

      <h2 className="relative mb-4 text-center text-4xl font-bold">Sponsors</h2>
      <p className="relative mx-auto mb-12 max-w-xl text-center text-lg text-black/70">
        Interested in sponsoring BostonHacks 2026? We&apos;d love to hear from
        you — reach out at{" "}
        <a
          href="mailto:contact.bostonhacks@gmail.com"
          className="font-bold text-black underline"
        >
          contact.bostonhacks@gmail.com
        </a>
        .
      </p>

      <ul className="relative mx-auto flex max-w-4xl flex-wrap justify-center gap-6">
        {SPONSORS.map((sp) => (
          <li key={sp.name} className="w-full max-w-xs">
            <a
              href={sp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-video items-center justify-center rounded-xl border-[3px] border-black bg-white p-8 shadow-md transition-transform hover:-translate-y-0.5"
            >
              <Image
                src={sp.logo}
                alt={sp.name}
                width={sp.width}
                height={sp.height}
                unoptimized
                className="h-auto w-full"
              />
            </a>
          </li>
        ))}
        <li className="w-full max-w-xs">
          <div className="flex aspect-video items-center justify-center rounded-xl border-[3px] border-dashed border-black/30 bg-black/5 text-center text-xl font-bold uppercase tracking-wide text-black/40">
            More soon!
          </div>
        </li>
      </ul>
    </section>
  );
}

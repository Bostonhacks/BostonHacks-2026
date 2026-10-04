// SponsorsSection — placeholder sponsors showcase. No Figma frame exists for this
// section in the wireframe file (462:124 has no "sponsors" node) — Navbar's
// "Sponsors" station and Hero's "Sponsor Us" CTA both already pointed at
// #sponsors with nothing there to land on (same class of dead-anchor bug as
// Sign Up), so this both adds the section and fixes those two links. Built to
// match the rest of the site's established visual language (blueprint grid,
// Akshar font, dashed/bordered placeholder treatment) rather than a specific
// Figma spec, since there isn't one. Real sponsor logos aren't wired up yet —
// swap PLACEHOLDER_SPONSORS for real logo assets/links once they're provided.
const PLACEHOLDER_SPONSORS = Array.from(
  { length: 6 },
  (_, i) => `Sponsor ${i + 1}`,
);

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
          contact@bostonhacks.org
        </a>
        .
      </p>

      <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
        {PLACEHOLDER_SPONSORS.map((name) => (
          <div
            key={name}
            className="flex aspect-video items-center justify-center rounded-xl border-[3px] border-dashed border-black/30 bg-black/5 text-center text-sm font-bold uppercase tracking-wide text-black/40"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

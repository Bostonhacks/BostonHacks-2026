// Footer — FE-15. Social icon row per Figma node 462:544. Crops the pre-exported
// public/images/footer/social-icons.png sprite (already committed to the repo)
// into three separate links, instead of adding a new icon dependency.
// Placeholder hrefs until real social URLs are provided.
const SPRITE_WIDTH = 147;
const SPRITE_HEIGHT = 26;
const ICON_WIDTH = SPRITE_WIDTH / 3;

const SOCIALS = [
  { label: "Instagram", href: "#", index: 0 },
  { label: "Twitter", href: "#", index: 1 },
  { label: "Facebook", href: "#", index: 2 },
];

export default function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-6">
        {SOCIALS.map(({ label, href, index }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="rounded-full p-2 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue"
          >
            <span
              aria-hidden
              className="block"
              style={{
                width: ICON_WIDTH,
                height: SPRITE_HEIGHT,
                backgroundImage: "url(/images/footer/social-icons.png)",
                backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
                backgroundPosition: `-${index * ICON_WIDTH}px 0`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

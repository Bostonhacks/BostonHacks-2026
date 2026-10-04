// Footer — FE-15. Social icon row per Figma node 462:544, which only ever drew
// Instagram/Twitter/Facebook (public/images/footer/social-icons.png, a
// pre-exported sprite crop into three links) — kept as-is for those two
// (Instagram/Facebook) rather than replaced, since it's the actual hand-drawn
// Figma asset. LinkedIn and Email have no equivalent in the design (the source
// file simply doesn't include them), and Twitter's sprite crop is the old bird
// logo rather than the current X rebrand — all three are plain inline SVGs
// instead. (An earlier version used @mui/icons-material for these three, but
// MUI's SvgIcon renders via Emotion CSS-in-JS, which needs an SSR cache
// provider wired into the root layout to stay consistent between server and
// client — without it, App Router hydration mismatches on the injected
// <style> tag. Simpler to avoid the dependency than add that plumbing for
// three icons, and it matches the rest of this Tailwind-only codebase.)
// Real hrefs below replace the earlier "#" placeholders.
const SPRITE_WIDTH = 147;
const SPRITE_HEIGHT = 26;
const ICON_WIDTH = SPRITE_WIDTH / 3;

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={SPRITE_HEIGHT}
      height={SPRITE_HEIGHT}
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`${className} flex items-center justify-center rounded-[4px] bg-black font-sans text-xs font-bold leading-none text-white`}
      style={{ width: SPRITE_HEIGHT, height: SPRITE_HEIGHT }}
    >
      in
    </span>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={SPRITE_HEIGHT}
      height={SPRITE_HEIGHT}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EXTERNAL_LINKS: {
  label: string;
  href: string;
  render: (props: { className: string }) => React.ReactNode;
}[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bostonhacks",
    render: ({ className }) => (
      <span
        aria-hidden
        className={className}
        style={{
          width: ICON_WIDTH,
          height: SPRITE_HEIGHT,
          backgroundImage: "url(/images/footer/social-icons.png)",
          backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
          backgroundPosition: "0px 0",
          backgroundRepeat: "no-repeat",
        }}
      />
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/boston_hacks",
    render: ({ className }) => <XIcon className={className} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bostonhacks",
    render: ({ className }) => (
      <span
        aria-hidden
        className={className}
        style={{
          width: ICON_WIDTH,
          height: SPRITE_HEIGHT,
          backgroundImage: "url(/images/footer/social-icons.png)",
          backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
          backgroundPosition: `-${2 * ICON_WIDTH}px 0`,
          backgroundRepeat: "no-repeat",
        }}
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bostonhacks/",
    render: ({ className }) => <LinkedInIcon className={className} />,
  },
];

const EMAIL = "contact.bostonhacks@gmail.com";

export default function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6">
        {EXTERNAL_LINKS.map(({ label, href, render }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="rounded-full p-2 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue"
          >
            {render({ className: "block" })}
          </a>
        ))}
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email BostonHacks"
          className="flex items-center gap-2 rounded-full p-2 font-akshar text-sm font-bold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-track-blue sm:text-base"
        >
          <EmailIcon />
          {EMAIL}
        </a>
      </div>
    </footer>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

// TrackCard — FE-8, revisited to add the second state from the wireframe. The
// assembled Desktop/Mobile wireframes (Figma node 462:280) show a default
// "platform sign" card — title + INBOUND/TO TRAINS/OUTBOUND subtitle — while
// node 462:557 ("Tracks - on click") shows the same card expanded with a
// description. Click toggles between them, same pattern as FaqItem's accordion.
// Colors reuse the --track-* tokens pulled from 462:557 in app/globals.css.
// The hand-drawn wobbly border is the actual asset from node 462:658 (stretched
// to fit — all three tracks' borders are the same size/shape in the source file),
// not a CSS border.
type TrackColor = "blue" | "green" | "red";

export type TrackDescription = {
  paragraphs: string[];
  prompt?: string;
  questions: string[];
};

const HEADER_BG: Record<TrackColor, string> = {
  blue: "var(--track-blue)",
  green: "var(--track-green)",
  red: "var(--track-red)",
};

const MASCOT_SRC: Record<TrackColor, string> = {
  blue: "/images/trackcard/train-blue.svg",
  green: "/images/trackcard/train-green.svg",
  red: "/images/trackcard/train-red.svg",
};

// Small hand-drawn accents per track (462:661 "#", 462:674 curved arrow, 462:676
// ">>"), positioned as an exact percentage of the sign's own box — computed
// directly from each accent's real Figma coordinates relative to its sign frame,
// not a generic "hover above one corner" treatment (each one sits differently:
// the "#" pokes out past the left edge vertically upper-mid, the arrow and ">>"
// sit mostly INSIDE the sign near its left/right edge, vertically centered).
const ACCENT_SRC: Record<TrackColor, string> = {
  blue: "/images/trackcard/accent-blue.png",
  green: "/images/trackcard/accent-green.png",
  red: "/images/trackcard/accent-red.png",
};
const ACCENT_RECT: Record<TrackColor, { left: string; top: string; width: string; height: string }> = {
  blue: { left: "-4.20%", top: "10.55%", width: "16.32%", height: "73.81%" },
  green: { left: "0.32%", top: "27.81%", width: "19.55%", height: "63.10%" },
  red: { left: "78.80%", top: "27.21%", width: "23.46%", height: "56.55%" },
};

// Mascot train icon sits on the opposite side from Track Two vs. One/Three in the
// source (462:282 blue mascot is right-of-sign, 462:298 green is left-of-sign,
// 462:317 red is right-of-sign) — not a fixed side.
const MASCOT_SIDE: Record<TrackColor, "left" | "right"> = {
  blue: "right",
  green: "left",
  red: "right",
};

// On-click-only extras, per Figma nodes 462:557/648:1677 ("Tracks - on click"):
// the mascot train tilts, and a small hand-drawn crayon/marker appears — neither
// exists in the default/closed card. Rotation angles are Figma's own transform
// on the mascot wrapper; the crayon PNGs were exported already-rotated as
// rendered on canvas (get_screenshot bakes transforms into the raster), so they
// need no CSS rotation of their own, just placement.
const MASCOT_ROTATE: Record<TrackColor, number> = {
  blue: 9.75,
  green: -9.74,
  red: 9.37,
};
const CRAYON_SRC: Record<TrackColor, string> = {
  blue: "/images/trackcard/crayon-blue.png",
  green: "/images/trackcard/crayon-green.png",
  red: "/images/trackcard/crayon-red.png",
};
// Native aspect ratio of each exported crayon PNG (34x37 / 43x42 / 39x40).
const CRAYON_ASPECT: Record<TrackColor, string> = {
  blue: "34 / 37",
  green: "43 / 42",
  red: "39 / 40",
};
// The crayon hangs off the SIGN's own bottom corner (not the mascot) — bottom-
// right for tracks one/two, bottom-left for track three, per Figma's real
// per-track coordinates (each artwork sits at the sign's own right/left edge,
// not a side determined by which side the mascot happens to be on — track two's
// mascot is on the left but its crayon is still bottom-right, same as track
// one). Positioned as a sibling of ACCENT_RECT below, in the same button-
// relative coordinate space so it isn't clipped by the sign's own
// overflow-hidden, same reasoning as that accent.
const CRAYON_RECT: Record<TrackColor, { left?: string; right?: string; bottom: string; width: string }> = {
  blue: { right: "-6%", bottom: "-8%", width: "13%" },
  green: { right: "-6%", bottom: "-8%", width: "13%" },
  red: { left: "-6%", bottom: "-8%", width: "13%" },
};

export default function TrackCard({
  color,
  title,
  subtitle,
  description,
}: {
  color: TrackColor;
  title: string;
  subtitle: string;
  description: TrackDescription;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // The closed sign's height, so the corner accent stays where Figma puts it on
  // the closed sign instead of drifting down into the description once the card
  // grows (its ACCENT_RECT percentages are relative to the closed sign).
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [closedHeight, setClosedHeight] = useState<number>();
  useLayoutEffect(() => {
    if (!isOpen && buttonRef.current) setClosedHeight(buttonRef.current.offsetHeight);
  }, [isOpen]);

  return (
    <div className={`flex w-full max-w-md items-center gap-3 font-akshar ${MASCOT_SIDE[color] === "left" ? "flex-row-reverse" : ""}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="relative flex-1 text-left shadow-md transition-transform hover:-translate-y-0.5"
      >
        {/* overflow-hidden lives on this inner wrapper, not the button itself, so the
            corner accent below (which intentionally sits outside the sign's bounds,
            per Figma) doesn't get clipped along with the sign's own rounded corners. */}
        <div
          className={`relative overflow-hidden rounded-2xl ${isOpen ? "animate-track-pop" : ""}`}
          style={{ backgroundColor: "var(--track-body)" }}
        >
          <div
            className="px-6 py-4 text-center font-presicav text-xl font-bold uppercase leading-tight text-balance text-white sm:text-2xl md:text-[1.75rem]"
            style={{ backgroundColor: HEADER_BG[color] }}
          >
            {title}
          </div>
          {isOpen ? (
            // Per Figma's on-click reference (462:557): the sign itself grows
            // taller to hold the description directly — no separate bordered box.
            // The real briefs are a few paragraphs plus a guiding-questions list,
            // far too long for the mock's single line of large bold text, so they
            // get a readable body size instead. The zoom-in pop (animate-track-pop,
            // above) plays on the whole card, not just this text, each time it opens.
            <span className="block space-y-4 px-6 py-8 text-left text-base leading-relaxed text-black sm:px-8 sm:py-10">
              {description.paragraphs.map((para) => (
                <span key={para} className="block">{para}</span>
              ))}
              {description.prompt && <span className="block font-bold">{description.prompt}</span>}
              <span className="block pt-2 font-presicav text-lg font-bold uppercase">Guiding Questions</span>
              <span className="block space-y-2">
                {description.questions.map((q) => (
                  <span key={q} className="flex gap-2">
                    <span aria-hidden style={{ color: HEADER_BG[color] }}>●</span>
                    <span>{q}</span>
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <p className="flex items-center justify-center gap-2 px-6 py-8 text-center font-presicav text-2xl font-bold uppercase tracking-wide text-black sm:text-3xl">
              {subtitle}
              {color === "green" && (
                <span className="relative -mt-1 h-5 w-5 shrink-0" aria-hidden>
                  <Image src="/images/trackcard/pointer.svg" alt="" fill unoptimized className="object-contain" />
                </span>
              )}
            </p>
          )}
          {/* Hand-drawn border (633x178 native) as a 9-slice border-image, not a
              stretched <Image>: the open card is several times taller than the
              asset, and stretching the whole raster smeared the top/bottom edges
              into thick blobs over the header and last lines of text. Slicing keeps
              the corners at native shape and repeats the wavy sides instead. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderStyle: "solid",
              borderWidth: 18,
              borderImageSource: "url(/images/trackcard/sign-border.png)",
              borderImageSlice: 30,
              borderImageRepeat: "stretch round",
            }}
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{ height: isOpen && closedHeight ? closedHeight : "100%" }}
        >
          <span className="absolute" style={ACCENT_RECT[color]}>
            <Image src={ACCENT_SRC[color]} alt="" fill unoptimized className="object-contain" />
          </span>
        </span>
        {isOpen && (
          <div
            className="pointer-events-none absolute animate-track-pop"
            style={{ ...CRAYON_RECT[color], aspectRatio: CRAYON_ASPECT[color] }}
            aria-hidden
          >
            <Image src={CRAYON_SRC[color]} alt="" fill unoptimized className="object-contain" />
          </div>
        )}
      </button>

      {/* Mascot — Figma's own aspect ratio (175:250) for all three, per 462:282/298/317.
          Tilts (MASCOT_ROTATE) only once opened, per the on-click reference. */}
      <div className="relative w-16 shrink-0" style={{ aspectRatio: "175 / 250" }} aria-hidden>
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: isOpen ? `rotate(${MASCOT_ROTATE[color]}deg)` : undefined }}
        >
          <Image src={MASCOT_SRC[color]} alt="" fill unoptimized className="object-contain" />
        </div>
      </div>
    </div>
  );
}

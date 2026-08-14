"use client";

import { useState } from "react";
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

export default function TrackCard({
  color,
  title,
  subtitle,
  description,
}: {
  color: TrackColor;
  title: string;
  subtitle: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex w-full max-w-md items-center gap-3 font-akshar ${MASCOT_SIDE[color] === "left" ? "flex-row-reverse" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="relative flex-1 text-left shadow-md transition-transform hover:-translate-y-0.5"
      >
        {/* overflow-hidden lives on this inner wrapper, not the button itself, so the
            corner accent below (which intentionally sits outside the sign's bounds,
            per Figma) doesn't get clipped along with the sign's own rounded corners. */}
        <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--track-body)" }}>
          <div
            className="whitespace-nowrap px-6 py-4 text-center font-presicav text-2xl font-bold uppercase text-white sm:text-3xl md:text-4xl"
            style={{ backgroundColor: HEADER_BG[color] }}
          >
            {title}
          </div>
          {isOpen ? (
            <p className="px-6 py-8 text-center text-lg font-bold text-black">{description}</p>
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
          <Image
            src="/images/trackcard/sign-border.png"
            alt=""
            fill
            unoptimized
            aria-hidden
            className="pointer-events-none object-fill"
          />
        </div>
        <div className="pointer-events-none absolute" style={ACCENT_RECT[color]} aria-hidden>
          <Image src={ACCENT_SRC[color]} alt="" fill unoptimized className="object-contain" />
        </div>
      </button>

      {/* Mascot — Figma's own aspect ratio (175:250) for all three, per 462:282/298/317 */}
      <div className="relative w-16 shrink-0" style={{ aspectRatio: "175 / 250" }} aria-hidden>
        <Image src={MASCOT_SRC[color]} alt="" fill unoptimized className="object-contain" />
      </div>
    </div>
  );
}

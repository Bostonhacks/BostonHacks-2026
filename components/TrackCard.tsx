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

// Small hand-drawn accents per track (462:661 "#", 462:674 refresh-arrow,
// 462:676 ">>"), positioned per their source coordinates: left corner for
// blue/green, right corner for red.
const ACCENT_SRC: Record<TrackColor, string> = {
  blue: "/images/trackcard/accent-blue.png",
  green: "/images/trackcard/accent-green.png",
  red: "/images/trackcard/accent-red.png",
};
const ACCENT_SIDE: Record<TrackColor, "left" | "right"> = {
  blue: "left",
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
    <div className="flex w-full max-w-md items-center gap-3 font-akshar">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="relative flex-1 overflow-hidden rounded-2xl text-left shadow-md transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: "var(--track-body)" }}
      >
        <div
          className="px-6 py-4 text-center text-2xl font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: HEADER_BG[color] }}
        >
          {title}
        </div>
        {isOpen ? (
          <p className="px-6 py-8 text-center text-lg font-bold text-black">{description}</p>
        ) : (
          <p className="flex items-center justify-center gap-2 px-6 py-8 text-center text-lg font-bold uppercase tracking-wide text-black">
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
        <div
          className={`pointer-events-none absolute -top-3 h-8 w-8 ${ACCENT_SIDE[color] === "left" ? "-left-3" : "-right-3"}`}
          aria-hidden
        >
          <Image src={ACCENT_SRC[color]} alt="" fill unoptimized className="object-contain" />
        </div>
      </button>

      <div className="relative h-20 w-16 shrink-0" aria-hidden>
        <Image src={MASCOT_SRC[color]} alt="" fill unoptimized className="object-contain" />
      </div>
    </div>
  );
}

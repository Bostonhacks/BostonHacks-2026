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
    <div className="relative w-full max-w-sm font-akshar">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="block w-full text-left transition-transform hover:-translate-y-0.5"
      >
        <div className="relative isolate overflow-hidden rounded-2xl shadow-md" style={{ backgroundColor: "var(--track-body)" }}>
          <Image
            src="/images/trackcard/sign-border.png"
            alt=""
            fill
            unoptimized
            aria-hidden
            className="pointer-events-none -z-10 object-fill"
          />
          <div
            className="px-6 py-4 text-center text-2xl font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: HEADER_BG[color] }}
          >
            {title}
          </div>
          {isOpen ? (
            <p className="px-6 py-8 text-center text-lg font-bold text-black">{description}</p>
          ) : (
            <p className="px-6 py-8 text-center text-lg font-bold uppercase tracking-wide text-black">
              {subtitle}
            </p>
          )}
        </div>
      </button>

      <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-16" aria-hidden>
        <Image src={MASCOT_SRC[color]} alt="" fill unoptimized className="object-contain" />
      </div>
    </div>
  );
}

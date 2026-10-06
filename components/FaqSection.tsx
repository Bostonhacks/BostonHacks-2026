"use client";

import { useState } from "react";
import Image from "next/image";
import FaqItem from "./FaqItem";
import Link from "next/link";

// FaqSection — FE-13. Holds which question is open and maps FAQS over FaqItem.
// Placeholder Q&A content — real copy isn't wired up yet.
//
// Decorative layer rebuilt against actual Figma coordinates (node 462:367 "bottom"),
// not eyeballed spacing. The header cluster — cloud behind "FAQs", the title text
// itself, and the big corner arrow — has fixed content (nothing there changes
// height), so it uses the same exact-percentage-canvas technique as Hero/
// ThemeGraphics: every element's left/top/width/height is a direct percentage of
// real Figma pixel coordinates. Canvas native size 1484 x 490.77px, anchored at
// Figma point (-64, 8378).
//
//   cloud-a (behind "FAQs")  37.87 /  0.00 / 62.13 / 77.44   (462:416)
//   "FAQs" text              61.72 / 32.40 / 20.28 / 17.53   (462:417)
//   arrow/pointer             0.00 / 44.44 / 18.19 / 55.58   (462:413)
//
// The second cloud (462:437) and the horizontal dashed line (462:411) sit lower,
// visually overlapping the question list — but the list's real height varies with
// which FAQ is open (an accordion, unlike anything in the static Figma mock), so
// they can't share that same rigid canvas without either clipping or floating in
// dead space depending on which question is expanded. They're sized from Figma's
// exact aspect ratio and given viewport-width-relative sizing (same principle as
// TracksSection's red hook line), just anchored near the list rather than
// percentage-locked to it.
const FAQS = [
  {
    question: "What is BostonHacks?",
    answer:
      "BostonHacks is a 24-hour event where students from different backgrounds gather together to use technology to create cool projects. Come to BostonHacks to expand your knowledge and skills, make new friends, win prizes and network with recruiters from our corporate sponsors!",
  },
  {
    question: "When and where is BostonHacks?",
    answer:
      "BostonHacks is an in-person 24-hour hackathon on November 21st-22nd, 2026. It takes place in the Boston University George Sherman Union (GSU).",
  },
  {
    question: "Who can attend?",
    answer:
      "All college students including undergraduate and graduate students with any background, all across the world are welcome!",
  },
  {
    question: "Are there any rules?",
    answer: (
      <div>
        We want to ensure a positive experience for all participants. We
        encourage you to read the{" "}
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          MLH Code of Conduct
        </Link>
        .
      </div>
    ),
  },
  {
    question: "Do I need experience?",
    answer:
      "No experience is necessary. We will have plenty of mentors and resources available, along with several workshops targeted for beginners. Come learn and experience your first hackathon at BostonHacks!",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — food, swag, and a place to hack are all provided at no cost! Unfortunately, we wont be providing any travel reimbursements this year.",
  },
  {
    question: "Do I need a team?",
    answer: "No — you can register solo and form a team at the event.",
  },
  {
    question: "What should I bring?",
    answer: "Your laptop, charger, and any hardware you want to hack with.",
  },
  {
    question: "MLH Code of Conduct",
    answer: (
      <div>
        TL;DR. Be respectful. Harassment and abuse are never tolerated. If you
        are in a situation that makes you uncomfortable at an MLH Member Event,
        if the event itself is creating an unsafe or inappropriate environment,
        or if interacting with a MLH representative or event organizer makes you
        uncomfortable, please refer to the
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Full MLH Code of Conduct PDF
        </Link>
        .
      </div>
    ),
  },
  {
    question: "What do I get if I win?",
    answer: (
      <div>
        Check out the{" "}
        <a href="#prizes" className="underline">
          prizes
        </a>{" "}
        below!
      </div>
    ),
  },
  {
    question: "Where can I ask more questions?",
    answer: "Reach out to us on our social pages, linked in the footer.",
  },
];

export default function FaqSection() {
  // -1 = none open. Was a plain `useState(0)` with `onToggle={() => setOpenIndex(i)}`
  // below — clicking an already-open question just set its own index again, a no-op,
  // so there was no way to close one once opened.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative isolate scroll-mt-[64px] overflow-hidden bg-white px-8 pb-16 pt-10 font-akshar text-black lg:scroll-mt-[215px]"
    >
      {/* Blueprint grid, per Figma nodes 462:396/462:420 — was missing entirely. */}
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

      {/* Header cluster: cloud + "FAQs" + arrow, per the exact-percentage canvas above */}
      <div
        className="relative mx-auto mb-8 max-w-3xl"
        style={{ aspectRatio: "1484 / 490.77" }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            left: "37.87%",
            top: "0%",
            width: "62.13%",
            height: "77.44%",
          }}
          aria-hidden
        >
          <Image
            src="/images/faq/cloud-a.png"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
        <h2
          className="absolute flex items-center justify-center text-center font-bold"
          style={{
            left: "61.72%",
            top: "32.40%",
            width: "20.28%",
            height: "17.53%",
            fontSize: "clamp(20px, 3.2vw, 40px)",
          }}
        >
          FAQs
        </h2>
        <div
          className="pointer-events-none absolute"
          style={{
            left: "0%",
            top: "44.44%",
            width: "18.19%",
            height: "55.58%",
          }}
          aria-hidden
        >
          <Image
            src="/images/faq/arrow.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      {/* Second cloud + horizontal dashed line, anchored near the question list —
          see file header for why these aren't part of the canvas above */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-8 w-[26vw] max-w-64"
        style={{ aspectRatio: "513 / 397" }}
      >
        <Image
          src="/images/faq/cloud-b.png"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[38%] w-[19vw] max-w-48 -translate-y-1/2"
        style={{ aspectRatio: "367.667 / 53.333" }}
      >
        <Image
          src="/images/faq/dashed-h.svg"
          alt=""
          fill
          unoptimized
          className="object-contain object-left"
        />
      </div>
      {/* This one is rotated -90deg in Figma's own source (a landscape line frame
          spun to read as a near-vertical diagonal) — the previous version sized
          the container to the already-rotated portrait footprint (184x569) but
          never applied the rotation itself, so the landscape asset (600x213
          native) got squashed flat into a portrait box instead of rotated into
          it. That's what was rendering as a barely-visible sliver. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-16 w-[42vw] max-w-[26rem]"
        style={{ aspectRatio: "600.232 / 212.706" }}
      >
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 -rotate-90">
          <Image
            src="/images/faq/dashed-line.svg"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      <ol className="relative mx-auto max-w-3xl list-decimal space-y-8 pl-8">
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </ol>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import FaqItem from "./FaqItem";

// FaqSection — FE-13. Holds which question is open and maps FAQS over FaqItem.
// Placeholder Q&A content — real copy isn't wired up yet. Decorative clouds and
// arrow icon pulled from Figma node 462:367 ("bottom") into public/images/faq/.
const FAQS = [
  { question: "What is BostonHacks?", answer: "BostonHacks is Boston University's largest student-run hackathon." },
  { question: "Who can attend?", answer: "Any student, of any skill level, is welcome to attend." },
  { question: "Is it free?", answer: "Yes — food, swag, and a place to hack are all provided at no cost." },
  { question: "Do I need a team?", answer: "No — you can register solo and form a team at the event." },
  { question: "What should I bring?", answer: "Your laptop, charger, and any hardware you want to hack with." },
  { question: "Where can I ask more questions?", answer: "Reach out to us on our social pages, linked in the footer." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white px-8 py-16 font-akshar text-black">
      <div aria-hidden className="pointer-events-none absolute right-8 top-8 hidden h-24 w-52 sm:block">
        <Image src="/images/faq/cloud-a.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -left-6 bottom-8 hidden h-24 w-24 lg:block">
        <Image src="/images/faq/cloud-b.png" alt="" fill unoptimized className="object-contain" />
      </div>
      <div aria-hidden className="pointer-events-none absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 lg:block">
        <Image src="/images/faq/arrow.svg" alt="" fill unoptimized className="object-contain" />
      </div>

      <h2 className="relative mx-auto mb-10 max-w-3xl text-4xl font-bold">FAQs</h2>
      <ol className="relative mx-auto max-w-3xl list-decimal space-y-8 pl-8">
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(i)}
          />
        ))}
      </ol>
    </section>
  );
}

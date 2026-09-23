import type { ReactNode } from "react";

// FaqItem — FE-12. Dumb component per Figma node 462:678 ("FAQ on-click"): collapsed
// renders the question row only; expanded highlights the question (track-blue) and
// shows the answer in a yellow-bordered callout with a dashed connector, per the
// wireframe. State lives in FaqSection (FE-13) — this component just renders props.
// `answer` is a ReactNode, not a plain string — some FAQ entries link out to the
// MLH Code of Conduct, which needs real JSX (a <Link>), not just text.
export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="marker:font-bold marker:text-black/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="block text-left text-2xl font-bold transition-colors sm:text-3xl md:text-4xl"
        style={{ color: isOpen ? "var(--track-blue)" : "black" }}
      >
        {question}
      </button>

      {isOpen && (
        <div className="relative mt-3 flex items-start gap-4">
          <span
            aria-hidden
            className="mt-4 h-0 w-8 shrink-0 border-t-[3px] border-dashed sm:w-12"
            style={{ borderColor: "var(--track-blue)" }}
          />
          {/* div, not p — some answers are JSX containing a <div> (the MLH Code of
              Conduct link callouts), and a div can't validly nest inside a p. */}
          <div
            className="rounded-md border-[3px] bg-white px-6 py-4 text-base sm:text-lg"
            style={{ borderColor: "var(--faq-answer-border)" }}
          >
            {answer}
          </div>
        </div>
      )}
    </li>
  );
}

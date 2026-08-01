// ThemeIntro — FE-6. Rounded-rectangle badge per Figma node 462:538 ("This year's
// theme is..."). Heading text is a prop so real copy can be swapped in later.
export default function ThemeIntro({ text }: { text: string }) {
  return (
    <section aria-label="Theme" className="w-full bg-white px-8 py-12 font-akshar text-black">
      <div className="mx-auto flex max-w-3xl justify-center">
        <div className="rounded-2xl border-[6px] border-black bg-white px-6 py-4 text-center text-xl font-bold shadow-md sm:px-10 sm:py-6 sm:text-3xl md:text-4xl">
          {text}
        </div>
      </div>
    </section>
  );
}

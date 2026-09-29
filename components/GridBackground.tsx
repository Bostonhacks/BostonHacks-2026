// components/GridBackground.tsx
// The graph-paper grid used behind Hero, extracted so other pages (like
// /login) can reuse the exact same background — same --track-blue token,
// same 72px grid, same radial mask fade — instead of re-approximating it.
// Place this as the first child inside a `relative` (or `isolate`) parent.
export default function GridBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 opacity-40 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--track-blue) 1.5px, transparent 1.5px)," +
          "linear-gradient(to bottom, var(--track-blue) 1.5px, transparent 1.5px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(120% 90% at 0% 0%, black 15%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(120% 90% at 0% 0%, black 15%, transparent 70%)",
      }}
    />
  );
}

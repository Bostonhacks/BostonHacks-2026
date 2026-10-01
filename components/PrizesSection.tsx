import Image from "next/image";

// PrizesSection — sits directly under FAQs, per the updated wireframe. Fixed content
// (nothing here changes height), so it uses the same exact-percentage-canvas
// technique as Hero/ThemeGraphics/FaqSection's header: every element's
// left/top/width/height is a direct percentage of the mockup's pixel coordinates.
// Canvas native size 588 x 560, measured from the design export (no Figma node ID
// available for this frame yet).
//
// The illustrations in public/images/prizes are PLACEHOLDER crops of that export —
// swap them for the real high-res assets from Figma (same filenames) once exported.
type Placed = { left: string; top: string; width: string; height: string };

const PRIZES: { name: string; src: string; img: Placed; label: Placed }[] = [
  {
    name: "Fujifilm Mini 99 Instax Film Camera",
    src: "/images/prizes/camera.png",
    img: { left: "30.95%", top: "8.93%", width: "33.33%", height: "27.68%" },
    label: { left: "37.07%", top: "36.96%", width: "28.91%", height: "6%" },
  },
  {
    name: "Syitren Paron Vinyl Record Player",
    src: "/images/prizes/vinyl.png",
    img: { left: "6.12%", top: "47.32%", width: "34.69%", height: "30.89%" },
    label: { left: "9.86%", top: "78.57%", width: "28.91%", height: "6%" },
  },
  {
    name: "Deco Gear 34” Curved Gaming Monitor",
    src: "/images/prizes/monitor.png",
    img: { left: "57.48%", top: "51.43%", width: "37.76%", height: "39.29%" },
    label: { left: "63.61%", top: "91.61%", width: "28.91%", height: "6%" },
  },
];

const DOODLES: { src: string; pos: Placed }[] = [
  { src: "/images/prizes/leaf-yellow.png", pos: { left: "8.50%", top: "27.14%", width: "13.27%", height: "15.36%" } },
  { src: "/images/prizes/leaf-green.png", pos: { left: "73.64%", top: "21.07%", width: "17.01%", height: "14.29%" } },
  { src: "/images/prizes/leaf-red.png", pos: { left: "34.69%", top: "87.50%", width: "11.22%", height: "12.14%" } },
  { src: "/images/prizes/squiggle.png", pos: { left: "46.60%", top: "77.50%", width: "9.18%", height: "13.21%" } },
];

export default function PrizesSection() {
  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="relative w-full scroll-mt-[140px] overflow-hidden bg-white px-8 py-10 font-akshar text-black md:scroll-mt-[215px]"
    >
      <div
        className="relative mx-auto max-w-3xl"
        style={{ aspectRatio: "588 / 560", containerType: "inline-size" }}
      >
        <h2
          id="prizes-heading"
          className="absolute flex items-center justify-center rounded-[4px] border-[3px] border-black font-bold tracking-wide"
          style={{ left: "7.82%", top: "2.32%", width: "22.96%", height: "8.39%", fontSize: "max(18px, 4.4cqw)" }}
        >
          Prizes
        </h2>

        {DOODLES.map((d) => (
          <div key={d.src} aria-hidden className="pointer-events-none absolute" style={d.pos}>
            <Image src={d.src} alt="" fill unoptimized className="object-contain" />
          </div>
        ))}

        <ul>
          {PRIZES.map((p) => (
            <li key={p.name}>
              <div className="absolute" style={p.img}>
                <Image src={p.src} alt="" fill unoptimized className="object-contain" />
              </div>
              <p
                className="absolute text-center font-helvetica leading-tight"
                style={{ ...p.label, fontSize: "max(10px, 2.4cqw)" }}
              >
                {p.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

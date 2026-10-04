import Image from "next/image";

// PrizesSection — sits directly under FAQs, per the updated wireframe. Fixed content
// (nothing here changes height), so it uses the same exact-percentage-canvas
// technique as Hero/ThemeGraphics/FaqSection's header: every element's
// left/top/width/height is a direct percentage of the design export's pixel
// coordinates. Canvas native size 1430 x 1352 = the "Prizes.png" export from the
// 2026 Wireframes folder.
//
// Art in public/images/prizes is cut from that export. The prize captions were
// baked into the export on top of each item's color glow, so they were painted
// out of the art (glow filled back in) and are rendered here as real text at
// their exported positions; likewise the "Prizes" title box is the hand-drawn
// frame with its lettering removed, with the heading as live text over it.
type Placed = { left: string; top: string; width: string; height: string };

const PRIZES: { name: string; lines: [string, string]; src: string; img: Placed; captionX: string; captionTop: string }[] = [
  {
    name: "Fujifilm Mini 99 Instax Film Camera",
    lines: ["Fujifilm Mini 99 Instax", "Film Camera"],
    src: "/images/prizes/camera.png",
    img: { left: "30.21%", top: "7.54%", width: "32.59%", height: "34.10%" },
    captionX: "51.08%",
    captionTop: "35.72%",
  },
  {
    name: "Syitren Paron Vinyl Record Player",
    lines: ["Syitren Paron Vinyl", "Record Player"],
    src: "/images/prizes/vinyl.png",
    img: { left: "5.73%", top: "46.75%", width: "34.48%", height: "37.43%" },
    captionX: "22.73%",
    captionTop: "77.96%",
  },
  {
    name: "Deco Gear 34” Curved Gaming Monitor",
    lines: ["Deco Gear 34” Curved", "Gaming Monitor"],
    src: "/images/prizes/monitor.png",
    img: { left: "58.18%", top: "50.30%", width: "35.66%", height: "42.09%" },
    captionX: "78.04%",
    captionTop: "91.05%",
  },
];

const DOODLES: { src: string; pos: Placed }[] = [
  { src: "/images/prizes/leaf-yellow.png", pos: { left: "8.74%", top: "25.96%", width: "11.61%", height: "14.35%" } },
  { src: "/images/prizes/leaf-green.png", pos: { left: "74.27%", top: "19.67%", width: "15.66%", height: "13.54%" } },
  { src: "/images/prizes/leaf-red.png", pos: { left: "35.10%", top: "87.20%", width: "10.14%", height: "10.72%" } },
  { src: "/images/prizes/squiggle.png", pos: { left: "44.76%", top: "77.29%", width: "9.86%", height: "13.68%" } },
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
        style={{ aspectRatio: "1430 / 1352", containerType: "inline-size" }}
      >
        <div className="absolute" style={{ left: "7.27%", top: "0%", width: "23.22%", height: "8.80%" }}>
          <Image src="/images/prizes/title-box.png" alt="" fill unoptimized className="object-fill" />
          <h2
            id="prizes-heading"
            className="absolute inset-0 flex items-center justify-center font-helvetica font-bold tracking-wide"
            style={{ fontSize: "max(18px, 3.7cqw)" }}
          >
            Prizes
          </h2>
        </div>

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
                className="absolute -translate-x-1/2 whitespace-nowrap text-center font-helvetica"
                style={{ left: p.captionX, top: p.captionTop, fontSize: "max(10px, 2.05cqw)", lineHeight: 1.15 }}
              >
                {p.lines[0]}
                <br />
                {p.lines[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

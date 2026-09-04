import { Reveal } from "./Reveal";
import img1 from "@/assets/uploads/IMG-20260708-WA0001.jpg.asset.json";
import img3 from "@/assets/uploads/IMG-20260708-WA0036.jpg.asset.json";
import img6 from "@/assets/uploads/IMG-20260708-WA0054.jpg.asset.json";
import img8 from "@/assets/uploads/IMG-20260708-WA0072.jpg.asset.json";
import img9 from "@/assets/uploads/IMG-20260708-WA0028.jpg.asset.json";
import nikeBoots from "@/assets/uploads/IMG-20260708-WA0062.jpg.asset.json";
import adidasBoots from "@/assets/uploads/IMG-20260708-WA0065.jpg.asset.json";
import tracksuit from "@/assets/uploads/IMG-20260708-WA0066.jpg.asset.json";
import netballBlue from "@/assets/uploads/IMG-20260708-WA0007.jpg.asset.json";
import netballPink from "@/assets/uploads/IMG-20260708-WA0008.jpg.asset.json";
import netballYellow from "@/assets/uploads/IMG-20260708-WA0009.jpg.asset.json";

const images = [
  { src: nikeBoots.url, alt: "Nike Mercurial Air Zoom football boots", span: "lg:col-span-2 lg:row-span-2" },
  { src: adidasBoots.url, alt: "Adidas X Crazyfast football boots" },
  { src: tracksuit.url, alt: "Nike tracksuit — yellow jacket and black pants" },
  { src: netballPink.url, alt: "Gilbert Pulse netball in pink" },
  { src: netballBlue.url, alt: "Gilbert netball in light blue" },
  { src: netballYellow.url, alt: "Gilbert netball in yellow and red" },
  { src: img1.url, alt: "Arsenal home jersey" },
  { src: img3.url, alt: "Mikasa volleyball" },
  { src: img6.url, alt: "Adidas track pants collection" },
  { src: img8.url, alt: "Team kit — jersey and shorts" },
  { src: img9.url, alt: "Custom printed Kamale VTC team jersey" },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Gallery
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            A look inside the shop.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {images.map((img) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-2xl bg-muted ${img.span ?? ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

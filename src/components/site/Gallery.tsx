import { Reveal } from "./Reveal";

// TODO: Replace these with your own product / store photos.
// Placeholder images from Unsplash (sports).
const images = [
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1000&q=80", alt: "Football on field", span: "lg:col-span-2 lg:row-span-2" },
  { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80", alt: "Basketball" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", alt: "Running shoes" },
  { src: "https://images.unsplash.com/photo-1583500178690-f7fd39f6e51e?w=800&q=80", alt: "Gym equipment" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", alt: "Athlete training" },
  { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80", alt: "Volleyball" },
  { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", alt: "Rugby ball" },
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
            A look at what we do.
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

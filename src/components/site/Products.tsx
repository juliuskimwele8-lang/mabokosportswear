import { Reveal } from "./Reveal";
import jersey from "@/assets/uploads/IMG-20260708-WA0001.jpg.asset.json";
import puma from "@/assets/uploads/IMG-20260708-WA0002.jpg.asset.json";
import volleyball from "@/assets/uploads/IMG-20260708-WA0036.jpg.asset.json";
import basketballs from "@/assets/uploads/IMG-20260708-WA0006.jpg.asset.json";
import boots from "@/assets/uploads/IMG-20260708-WA0050.jpg.asset.json";
import trackpants from "@/assets/uploads/IMG-20260708-WA0054.jpg.asset.json";
import rugby from "@/assets/uploads/IMG-20260708-WA0013.jpg.asset.json";
import kit from "@/assets/uploads/IMG-20260708-WA0072.jpg.asset.json";
import custom from "@/assets/uploads/IMG-20260708-WA0028.jpg.asset.json";

const products = [
  { img: jersey.url, name: "Club Jerseys", desc: "Premier league replica shirts and club kits." },
  { img: boots.url, name: "Football Boots", desc: "Adidas Predator, Nike & Puma boots — firm ground & AG." },
  { img: puma.url, name: "Footballs", desc: "Puma, Molten and Mikasa match & training balls." },
  { img: basketballs.url, name: "Basketballs", desc: "Molten indoor & outdoor basketballs, all sizes." },
  { img: volleyball.url, name: "Volleyballs", desc: "Mikasa MV210 FIVB official match volleyballs." },
  { img: rugby.url, name: "Rugby Balls", desc: "Gilbert Barbarian 2.0 match balls, size 5." },
  { img: trackpants.url, name: "Track Pants", desc: "Adidas track pants in multiple colours & sizes." },
  { img: kit.url, name: "Team Kits", desc: "Full jersey + shorts sets, ready for team printing." },
  { img: custom.url, name: "Custom Printing", desc: "Name, number and team crest printing on request." },
];

export function Products() {
  return (
    <section id="products" className="section-pad bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Our Products
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything you need to compete.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Contact us for pricing, availability and bulk orders for your team or school.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <article className="card-soft group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <a
                    href={`mailto:mabokosports6@gmail.com?subject=${encodeURIComponent(
                      `Order enquiry: ${p.name}`
                    )}&body=${encodeURIComponent(
                      `Hi Maboko Sports Wear,\n\nI'd like to order / enquire about: ${p.name}.\n\nQuantity:\nPreferred size / colour:\nMy name:\nMy phone:\n\nThanks.`
                    )}`}
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors group-hover:bg-primary"
                  >
                    Contact to Order
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

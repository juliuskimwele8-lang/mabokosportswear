import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { productsQueryOptions } from "@/lib/products";

export function Products() {
  const { data: products = [] } = useQuery(productsQueryOptions());
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const display = featured.length > 0 ? featured : products.slice(0, 6);

  return (
    <section id="products" className="section-pad bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Featured Products
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything you need to compete.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A taste of what's in store. Browse the full catalog for jerseys, boots, balls, kits and custom prints.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="card-soft group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                  <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
                  {p.description && (
                    <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-display text-base">
                      {p.price != null ? `KSh ${Number(p.price).toLocaleString()}` : "Ask price"}
                    </span>
                    <a
                      href={`mailto:mabokosports6@gmail.com?subject=${encodeURIComponent(
                        `Order enquiry: ${p.name}`,
                      )}&body=${encodeURIComponent(
                        `Hi Maboko Sports Wear,\n\nI'd like to order / enquire about: ${p.name}.\n\nQuantity:\nPreferred size / colour:\nMy name:\nMy phone:\n\nThanks.`,
                      )}`}
                      className="inline-flex items-center justify-center rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition-colors group-hover:bg-primary"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link to="/products" className="btn-primary inline-flex">
            View full catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

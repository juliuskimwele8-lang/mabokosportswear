import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { ProductImage } from "@/components/site/ProductImage";
import { productsQueryOptions, type Product } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Products — Maboko Sports Wear" },
      {
        name: "description",
        content:
          "Browse the full Maboko Sports Wear catalog — jerseys, football boots, balls, kits and custom team printing in Mariakani.",
      },
      { property: "og:title", content: "Shop Products — Maboko Sports Wear" },
      {
        property: "og:description",
        content:
          "Jerseys, boots, balls, kits and custom prints in Mariakani. Browse the full Maboko Sports Wear catalog.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQueryOptions());
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions());
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, category, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Header */}
        <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,var(--color-primary),transparent_45%),radial-gradient(circle_at_80%_60%,oklch(0.7_0.18_235),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShoppingBag className="h-3.5 w-3.5" /> Full Catalog
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Gear up. Compete. <span className="text-primary">Win.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/70">
              Every product in the Maboko Sports Wear shop — updated as new stock lands in Mariakani. Tap any product to order via email or WhatsApp.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex flex-1 gap-2 overflow-x-auto pb-1 lg:pb-0">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="section-pad">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center">
                <p className="text-lg font-semibold">No products found.</p>
                <p className="mt-1 text-sm text-muted-foreground">Try another category or search term.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <Link
        to="/auth"
        className="fixed bottom-6 left-6 z-40 hidden text-xs font-medium text-muted-foreground/70 hover:text-primary sm:inline"
      >
        Admin
      </Link>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const mailto = `mailto:mabokosports6@gmail.com?subject=${encodeURIComponent(
    `Order enquiry: ${product.name}`,
  )}&body=${encodeURIComponent(
    `Hi Maboko Sports Wear,\n\nI'd like to order / enquire about: ${product.name}.\n\nQuantity:\nPreferred size / colour:\nMy name:\nMy phone:\n\nThanks.`,
  )}`;
  return (
    <article className="card-soft group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image_url ? (
          <ProductImage
            url={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">No image</div>
        )}
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</span>
        <h3 className="mt-1 text-lg font-bold leading-tight">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-lg">
            {product.price != null ? `KSh ${Number(product.price).toLocaleString()}` : "Ask price"}
          </span>
          <a
            href={mailto}
            className="inline-flex items-center justify-center rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition-colors group-hover:bg-primary"
          >
            Order
          </a>
        </div>
      </div>
    </article>
  );
}

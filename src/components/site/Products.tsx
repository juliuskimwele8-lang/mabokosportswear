import {
  Trophy,
  Dumbbell,
  Shirt,
  Volleyball,
  Medal,
  Timer,
  CircleDot,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";

// TODO: Replace product images with real photos; keep the same categories or edit as needed.
const products = [
  {
    icon: CircleDot,
    name: "Football",
    desc: "Match balls, boots, shin guards and training kits.",
    tint: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: Trophy,
    name: "Basketball",
    desc: "Indoor & outdoor balls, hoops, jerseys and shoes.",
    tint: "from-orange-500/20 to-orange-600/5",
  },
  {
    icon: Volleyball,
    name: "Volleyball",
    desc: "Balls, nets, knee pads and complete team sets.",
    tint: "from-yellow-500/20 to-yellow-600/5",
  },
  {
    icon: Zap,
    name: "Rugby",
    desc: "Match balls, protective gear and team uniforms.",
    tint: "from-red-500/20 to-red-600/5",
  },
  {
    icon: Timer,
    name: "Athletics",
    desc: "Running gear, spikes, stopwatches and field equipment.",
    tint: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Dumbbell,
    name: "Gym Equipment",
    desc: "Weights, benches, mats and home gym essentials.",
    tint: "from-slate-500/20 to-slate-700/5",
  },
  {
    icon: Shirt,
    name: "Jerseys",
    desc: "Custom team jerseys, kits and training wear.",
    tint: "from-purple-500/20 to-purple-600/5",
  },
  {
    icon: Medal,
    name: "Training Equipment",
    desc: "Cones, ladders, resistance gear and accessories.",
    tint: "from-cyan-500/20 to-cyan-600/5",
  },
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
            Browse our categories. Contact us for pricing, availability and bulk orders.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <article className="card-soft group flex h-full flex-col overflow-hidden">
                {/* Image placeholder area — swap the gradient div for an <img> when you have photos */}
                <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${p.tint}`}>
                  <div className="absolute inset-0 grid place-items-center">
                    <p.icon
                      className="h-20 w-20 text-foreground/80 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                  <a
                    href="#contact"
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

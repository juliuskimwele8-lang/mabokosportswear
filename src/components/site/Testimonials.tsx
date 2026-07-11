import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";

// TODO: Replace with real customer testimonials
const items = [
  {
    name: "Marcus O.",
    role: "Coach, City FC",
    body: "The go-to shop for our club. Fair pricing on bulk kit orders and always in stock when we need it.",
  },
  {
    name: "Priya S.",
    role: "PE Teacher",
    body: "They kitted out our entire school PE program on budget. Everything arrived early and in perfect condition.",
  },
  {
    name: "David L.",
    role: "Weekend Runner",
    body: "Honest advice, real products. Been buying my running shoes here for years — wouldn't go anywhere else.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            What our customers say.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-soft flex h-full flex-col p-7">
                <Quote className="h-8 w-8 text-primary/40" />
                <blockquote className="mt-4 flex-1 text-foreground/90">"{t.body}"</blockquote>
                <div className="mt-6 flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

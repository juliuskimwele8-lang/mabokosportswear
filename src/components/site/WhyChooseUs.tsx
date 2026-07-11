import {
  BadgeCheck,
  Tag,
  Headphones,
  Package,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: BadgeCheck, title: "Genuine Products", body: "Only authentic gear from trusted brands — no counterfeits, ever." },
  { icon: Tag, title: "Affordable Prices", body: "Fair, transparent pricing with room for team discounts." },
  { icon: Headphones, title: "Fast Customer Service", body: "Real humans on WhatsApp, phone and email — quick replies." },
  { icon: Package, title: "Bulk Orders", body: "Wholesale pricing for teams, resellers and organizations." },
  { icon: GraduationCap, title: "Schools & Clubs", body: "Dedicated supply programs for schools, academies and clubs." },
  { icon: ShieldCheck, title: "Quality Guaranteed", body: "If it's not right, we'll make it right. Simple as that." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            The details that make the difference.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div className="card-soft group h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

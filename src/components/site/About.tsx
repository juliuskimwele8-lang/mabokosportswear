import { Award, Target, Users } from "lucide-react";
import aboutAsset from "@/assets/uploads/IMG-20260708-WA0019.jpg.asset.json";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section-pad bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src={aboutAsset.url}
              alt="Mikasa handballs in stock at Maboko Sports Wear"
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-3xl object-cover shadow-[var(--shadow-elevated)] aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-glow)] sm:block">
              <div className="text-4xl font-bold">100%</div>
              <div className="text-sm font-medium opacity-90">Authentic gear</div>
            </div>
          </div>

        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            About Us
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Mariakani's trusted sports outfitter.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Maboko Sports Wear supplies genuine jerseys, footwear, balls and
            training kits to teams, schools and individual athletes across the
            Coast region. Located along Kaloleni Road in Mariakani, we're proud
            to help clubs of every size look and play their best.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", body: "Quality sportswear that every athlete can afford." },
              { icon: Award, title: "Genuine Brands", body: "Adidas, Puma, Mikasa, Gilbert, Molten and more." },
              { icon: Users, title: "Teams & Schools", body: "Bulk supply and custom team printing available." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-muted/40 p-5">
                <f.icon className="h-6 w-6 text-primary" />
                <div className="mt-3 font-semibold text-foreground">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>

        </Reveal>
      </div>
    </section>
  );
}

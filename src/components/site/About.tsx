import { Award, Target, Users } from "lucide-react";
import aboutAsset from "@/assets/uploads/IMG-20260708-WA0006.jpg.asset.json";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section-pad bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src={aboutImg}
              alt="Our sports equipment showroom"
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-3xl object-cover shadow-[var(--shadow-elevated)]"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-glow)] sm:block">
              {/* TODO: Replace years of experience */}
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm font-medium opacity-90">Years of experience</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            About Us
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Built by athletes, for athletes.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {/* TODO: Replace with real company story */}
            What started as a small corner shop has grown into the go-to
            destination for teams, coaches and weekend players across the region.
            We stock what we'd use ourselves — no gimmicks, no shortcuts.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", body: "Make quality gear accessible to every athlete." },
              { icon: Award, title: "10+ Years", body: "Serving clubs, schools & individuals." },
              { icon: Users, title: "5,000+", body: "Athletes trust us for their gear." },
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

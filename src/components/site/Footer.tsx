import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const BUSINESS_NAME = "Apex Sports";

export function Footer() {
  return (
    <footer className="bg-[var(--gradient-ink)] bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary">
                <Dumbbell className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold">{BUSINESS_NAME}</span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Genuine sports equipment for athletes, teams, schools and clubs.
              Trusted for over a decade.
            </p>
            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {["about", "products", "why", "gallery", "testimonials", "contact"].map((s) => (
                <li key={s}>
                  <a href={`#${s}`} className="capitalize transition-colors hover:text-primary">
                    {s.replace("why", "Why Choose Us")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {["Football", "Basketball", "Gym Equipment", "Jerseys", "Training"].map((s) => (
                <li key={s}>
                  <a href="#products" className="transition-colors hover:text-primary">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {/* TODO: phone */}
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {/* TODO: email */}
                <span>hello@apexsports.example</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {/* TODO: address */}
                <span>123 Athletic Ave, Your City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <div>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-primary">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/uploads/IMG-20260708-WA0087.jpg.asset.json";

const BUSINESS_NAME = "Maboko Sports Wear";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white">
                <img src={logoAsset.url} alt="Maboko Sports Wear logo" className="h-full w-full object-contain p-1" />
              </span>
              <span className="font-display text-xl font-bold">{BUSINESS_NAME}</span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Genuine sportswear, footwear and team kits — proudly serving
              Mariakani and the wider Coast region.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: MessageCircle, href: "https://wa.me/254793249128" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
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
                    {s === "why" ? "Why Choose Us" : s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {["Jerseys", "Football Boots", "Footballs", "Basketballs", "Volleyballs", "Rugby", "Track Pants", "Custom Printing"].map((s) => (
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
                <span>0793 249 128 / 0762 032 044</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:mabokosports6@gmail.com" className="transition-colors hover:text-primary">mabokosports6@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Mariakani, Kaloleni Road, Kilifi County</span>
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

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/uploads/IMG-20260708-WA0087.jpg.asset.json";

const BUSINESS_NAME = "Maboko Sports Wear";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/products", label: "Shop", isRoute: true },
  { href: "/#why", label: "Why Us" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border">
            <img src={logoAsset.url} alt="Maboko Sports Wear logo" className="h-full w-full object-contain p-1" />
          </span>
          <span
            className={`font-display text-base font-bold tracking-tight sm:text-lg ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            {BUSINESS_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground/80 hover:bg-muted hover:text-primary"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to={signedIn ? "/admin" : "/auth"}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              scrolled ? "text-primary hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
          >
            {signedIn ? "Dashboard" : "Sign In"}
          </Link>

          <a href="/#contact" className="btn-primary !py-2.5 !px-4 text-sm">
            Get in Touch
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-lg md:hidden ${
            scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={signedIn ? "/admin" : "/auth"}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-primary hover:bg-muted"
                >
                  {signedIn ? "Dashboard" : "Sign In"}
                </Link>
              </li>

              <li className="mt-2 px-1 pb-2">
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

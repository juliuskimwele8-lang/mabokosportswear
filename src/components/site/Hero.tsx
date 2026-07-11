import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      {/* Hero background image — replace src/assets/hero.jpg for a different look */}
      <img
        src={heroImg}
        alt="Premium sports equipment collection"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/70 to-black/50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.62_0.19_148_/_0.35),transparent_60%)]" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Trusted by athletes, clubs & schools
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Gear that <span className="text-primary">performs</span>.<br />
          Prices that make sense.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {/* TODO: Replace with real business description */}
          From weekend warriors to championship teams — we stock the equipment
          that keeps you in the game. Genuine brands. Fair pricing. Real service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#contact" className="btn-primary">
            <PhoneCall className="h-4 w-4" />
            Contact Us
          </a>
          <a href="#products" className="btn-outline">
            View Products
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-8"
        >
          {[
            { k: "10+", v: "Years serving athletes" },
            { k: "5K+", v: "Happy customers" },
            { k: "100%", v: "Genuine products" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-2xl font-bold text-white sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-white/70 sm:text-sm">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

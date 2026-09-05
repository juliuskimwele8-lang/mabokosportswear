import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Products } from "@/components/site/Products";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { MotionExperience } from "@/components/site/MotionExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maboko Sports Wear — Genuine Sports Gear in Mariakani" },
      {
        name: "description",
        content:
          "Maboko Sports Wear in Mariakani stocks authentic jerseys, football boots, balls and team kits. Custom team printing available. Call 0793 249 128.",
      },
      { property: "og:title", content: "Maboko Sports Wear — Genuine Sports Gear in Mariakani" },
      {
        property: "og:description",
        content: "Maboko Sports Wear in Mariakani stocks authentic jerseys, football boots, balls and team kits. Custom team printing available. Call 0793 249 128.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),

  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <MotionExperience />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

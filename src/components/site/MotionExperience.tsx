import { useEffect, useRef } from "react";

export function MotionExperience() {
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]) => {
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 54 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
            gsap.fromTo(
              element,
              { yPercent: -5, scale: 1.06 },
              {
                yPercent: 5,
                scale: 1.06,
                ease: "none",
                scrollTrigger: {
                  trigger: element.parentElement ?? element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        });

        const finePointer = window.matchMedia("(pointer: fine)").matches;
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const removeListeners: Array<() => void> = [];

        if (finePointer && cursor && dot) {
          document.documentElement.classList.add("has-motion-cursor");
          removeListeners.push(() =>
            document.documentElement.classList.remove("has-motion-cursor"),
          );
          const cursorX = gsap.quickTo(cursor, "x", { duration: 0.42, ease: "power3" });
          const cursorY = gsap.quickTo(cursor, "y", { duration: 0.42, ease: "power3" });
          const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
          const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });

          const onMove = (event: MouseEvent) => {
            cursorX(event.clientX);
            cursorY(event.clientY);
            dotX(event.clientX);
            dotY(event.clientY);
            gsap.to([cursor, dot], { autoAlpha: 1, duration: 0.2 });
          };
          const onLeave = () => gsap.to([cursor, dot], { autoAlpha: 0, duration: 0.2 });
          const onOver = (event: MouseEvent) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            const interactive = target.closest("a, button, input, textarea, [data-cursor]");
            gsap.to(cursor, {
              scale: interactive ? 1.7 : 1,
              borderColor: interactive ? "var(--color-primary)" : "var(--cursor-ring)",
              duration: 0.25,
              ease: "power2.out",
            });
          };

          window.addEventListener("mousemove", onMove, { passive: true });
          document.addEventListener("mouseleave", onLeave);
          document.addEventListener("mouseover", onOver, { passive: true });
          removeListeners.push(
            () => window.removeEventListener("mousemove", onMove),
            () => document.removeEventListener("mouseleave", onLeave),
            () => document.removeEventListener("mouseover", onOver),
          );

          document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
            const onMagneticMove = (event: MouseEvent) => {
              const rect = element.getBoundingClientRect();
              gsap.to(element, {
                x: (event.clientX - rect.left - rect.width / 2) * 0.14,
                y: (event.clientY - rect.top - rect.height / 2) * 0.14,
                duration: 0.35,
                ease: "power2.out",
              });
            };
            const onMagneticLeave = () =>
              gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            element.addEventListener("mousemove", onMagneticMove);
            element.addEventListener("mouseleave", onMagneticLeave);
            removeListeners.push(
              () => element.removeEventListener("mousemove", onMagneticMove),
              () => element.removeEventListener("mouseleave", onMagneticLeave),
            );
          });
        }

        cleanup = () => {
          removeListeners.forEach((remove) => remove());
          context.revert();
        };
        ScrollTrigger.refresh();
      },
    );

    return () => cleanup();
  }, []);

  return (
    <>
      <div className="motion-progress" aria-hidden="true">
        <div ref={progressRef} className="motion-progress__bar" />
      </div>
      <div ref={cursorRef} className="motion-cursor" aria-hidden="true" />
      <div ref={dotRef} className="motion-cursor-dot" aria-hidden="true" />
    </>
  );
}
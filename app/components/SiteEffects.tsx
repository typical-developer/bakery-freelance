"use client";

import { useEffect } from "react";

/* Recreates the Webflow IX2 scroll interactions:
   - "flipbook" (a-15) and "fadeIn" reveal when an element scrolls into view
   - "parallax image scroll" (a-14/a-21) moves the band as it passes the viewport */
export default function SiteEffects() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll("[data-reveal], [data-fade]");
    const show = (element: Element) => element.classList.add("is-in");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0 },
    );
    revealTargets.forEach((element) => observer.observe(element));

    const band = document.querySelector<HTMLElement>("[data-parallax]");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!band) return;
      const rect = band.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        ),
      );
      band.style.setProperty("--par", `${(progress * 60 - 30).toFixed(2)}%`);
      band.style.setProperty("--par-scale", (1.2 - 0.2 * progress).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

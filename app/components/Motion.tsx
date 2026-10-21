"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const all = <T extends Element = HTMLElement>(selector: string) =>
  gsap.utils.toArray<T>(selector);
const markSet = (elements: Element[]) =>
  elements.forEach((element) => element.classList.add("is-set"));

/* One place for every GSAP interaction. Re-runs on each route change and
   respects prefers-reduced-motion (content simply shows, no animation). */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("js");
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.classList.add("js");

      /* Headings: lines rise out of a mask. */
      all("[data-split]").forEach((element) => {
        const hero = element.closest(".section--hero");
        SplitText.create(element, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            element.classList.add("is-set");
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.09,
              delay: hero ? 0.15 : 0,
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          },
        });
      });

      /* Hero entrance. */
      const heroItems = all("[data-hero-item]");
      if (heroItems.length) {
        gsap.set(heroItems, { opacity: 0, y: 28 });
        markSet(heroItems);
        gsap.to(heroItems, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.35,
          clearProps: "transform,opacity",
        });
      }
      const heroMedia = all("[data-hero-media]");
      if (heroMedia.length) {
        gsap.set(heroMedia, { opacity: 0, y: 64, scale: 0.92, rotate: 4 });
        markSet(heroMedia);
        gsap.to(heroMedia, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
        });
        gsap.to(heroMedia, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: ".section--hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      all("[data-badge]").forEach((badge) =>
        gsap.to(badge, { rotation: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%" }),
      );

      /* Cards and blocks: batched scroll reveals. */
      const cards = all("[data-reveal]");
      gsap.set(cards, { opacity: 0, y: 56, scale: 0.96 });
      markSet(cards);
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "transform,opacity",
          }),
      });
      const fades = all("[data-fade]");
      gsap.set(fades, { opacity: 0, y: 24 });
      markSet(fades);
      ScrollTrigger.batch(fades, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform,opacity",
          }),
      });

      /* Marquee: loops forever and speeds up with scroll velocity. */
      const marqueeTrack = document.querySelector<HTMLElement>("[data-marquee]");
      if (marqueeTrack) {
        const loop = gsap.to(marqueeTrack, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(0, 6, Math.abs(self.getVelocity()) / 400);
            loop.timeScale(1 + boost);
            gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
          },
        });
      }

      /* Photo band parallax. */
      all("[data-band]").forEach((band) => {
        const image = band.querySelector("[data-band-img]");
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* Navbar: hides when scrolling down, returns when scrolling up. */
      const nav = document.querySelector<HTMLElement>(".navbar");
      if (nav) {
        let hidden = false;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            nav.classList.toggle("is-scrolled", self.scroll() > 12);
            if (nav.classList.contains("is-open")) return;
            const shouldHide = self.direction === 1 && self.scroll() > 240;
            if (shouldHide === hidden) return;
            hidden = shouldHide;
            gsap.to(nav, {
              yPercent: hidden ? -160 : 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const frame = requestAnimationFrame(refresh);
      return () => {
        window.removeEventListener("load", refresh);
        cancelAnimationFrame(frame);
      };
    });

    /* Pointer-only extras: magnetic buttons and the cursor-following tag. */
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const cleanups: (() => void)[] = [];

        all(".btn").forEach((button) => {
          const x = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3" });
          const y = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3" });
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            x((event.clientX - (rect.left + rect.width / 2)) * 0.25);
            y((event.clientY - (rect.top + rect.height / 2)) * 0.25);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          button.addEventListener("pointermove", move);
          button.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            button.removeEventListener("pointermove", move);
            button.removeEventListener("pointerleave", leave);
          });
        });

        all("[data-cursor-tag]").forEach((card) => {
          const tag = card.querySelector<HTMLElement>(".cursor-tag");
          if (!tag) return;
          gsap.set(tag, { xPercent: -50, yPercent: -150, scale: 0.6 });
          const x = gsap.quickTo(tag, "x", { duration: 0.45, ease: "power3" });
          const y = gsap.quickTo(tag, "y", { duration: 0.45, ease: "power3" });
          const move = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            x(event.clientX - rect.left);
            y(event.clientY - rect.top);
          };
          const enter = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            gsap.set(tag, { x: event.clientX - rect.left, y: event.clientY - rect.top });
            gsap.to(tag, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)", overwrite: "auto" });
          };
          const leave = () =>
            gsap.to(tag, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          });
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    return () => mm.revert();
  }, [pathname]);

  return null;
}

"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

const all = <T extends Element = HTMLElement>(selector: string) =>
  gsap.utils.toArray<T>(selector);
const markSet = (elements: Element[]) =>
  elements.forEach((element) => element.classList.add("is-set"));

/* ------------------------------------------------------------------
   Route transition. A sheet slides up over the page with the La Crave logo
   in the middle, the route changes underneath, then the logo steps aside and
   the sheet lifts away. While it waits, the logo's square keeps turning.
   State lives at module level so it survives the effect re-run that
   happens when the pathname changes.
   ------------------------------------------------------------------ */
const navState = {
  covering: false,
  timer: null as gsap.core.Tween | null,
  spin: null as gsap.core.Tween | null,
};

const coverCurtain = (curtain: HTMLElement, onCovered: () => void) => {
  const logo = curtain.querySelector<HTMLElement>(".curtain-logo");
  const square = curtain.querySelector<SVGRectElement>(".curtain-logo rect");
  gsap.killTweensOf([curtain, logo, square]);
  gsap.set(curtain, { visibility: "visible", pointerEvents: "auto", yPercent: 100 });
  gsap.set(logo, { opacity: 0, y: 28, scale: 0.94 });
  gsap.set(square, { rotation: -90, transformOrigin: "50% 50%" });
  gsap
    .timeline({
      onComplete: () => {
        onCovered();
        navState.spin?.kill();
        navState.spin = gsap.to(square, {
          rotation: "+=360",
          duration: 1.4,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.15,
          transformOrigin: "50% 50%",
        });
      },
    })
    .to(curtain, { yPercent: 0, duration: 0.75, ease: "expo.inOut" })
    .to(logo, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out" }, 0.3)
    .to(square, { rotation: 0, duration: 0.7, ease: "back.out(2.2)" }, 0.35);
};

const liftCurtain = (curtain: HTMLElement) => {
  const logo = curtain.querySelector<HTMLElement>(".curtain-logo");
  gsap.killTweensOf([curtain, logo]);
  gsap
    .timeline({
      onComplete: () => {
        navState.spin?.kill();
        navState.spin = null;
        gsap.set(curtain, { visibility: "hidden" });
      },
    })
    .to(logo, { opacity: 0, y: -18, scale: 0.97, duration: 0.4, ease: "power2.in" }, 0.1)
    .to(curtain, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0.3);
};

/* ------------------------------------------------------------------
   Reveal recipes. Everything below is built from the brand's own
   objects: paper sheets, washi tape and the pink square.
   ------------------------------------------------------------------ */

/** A photo card is "dealt" onto the table: it lands, the paper sheet behind
    it fans out to its tilt, the photo settles and the tape sticks on last. */
const dealCard = (card: HTMLElement, delay: number) => {
  const side = card.classList.contains("photo-card--alt") ? -1 : 1;
  const tilt = getComputedStyle(card).getPropertyValue("--tilt").trim() || "2.5deg";
  const photo = card.querySelector<HTMLElement>(".photo-card-media img");
  const tape = card.querySelector<HTMLElement>(".washi");

  const tl = gsap.timeline({ delay });
  tl.fromTo(
    card,
    { opacity: 0, y: 96, rotate: 7 * side, scale: 0.94 },
    { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.4, ease: "expo.out", clearProps: "transform,opacity" },
    0,
  ).fromTo(
    card,
    { "--tilt": "0deg" },
    { "--tilt": tilt, duration: 1.2, ease: "back.out(1.7)", clearProps: "--tilt" },
    0.2,
  );
  if (photo) {
    tl.fromTo(photo, { scale: 1.22 }, { scale: 1, duration: 1.9, ease: "expo.out", clearProps: "transform" }, 0);
  }
  if (tape) {
    tl.fromTo(
      tape,
      { scale: 0, rotate: -30, opacity: 0 },
      { scale: 1, rotate: -4, opacity: 1, duration: 0.7, ease: "back.out(2.6)", clearProps: "transform,opacity" },
      0.55,
    );
  }
};

/** The yellow sheet behind the CTA swings out, then the copy follows. */
const dealCta = (card: HTMLElement, delay: number) => {
  const photo = card.querySelector<HTMLElement>(".cta-media img");
  const copy = card.querySelectorAll(".cta-copy .stack > *");
  const tl = gsap.timeline({ delay });
  tl.fromTo(
    card,
    { opacity: 0, y: 80, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "expo.out", clearProps: "transform,opacity" },
    0,
  ).fromTo(
    card,
    { "--tilt": "0deg" },
    { "--tilt": "2deg", duration: 1.4, ease: "back.out(1.8)", clearProps: "--tilt" },
    0.15,
  );
  if (photo) {
    tl.fromTo(photo, { scale: 1.2 }, { scale: 1, duration: 1.9, ease: "expo.out", clearProps: "transform" }, 0);
  }
  tl.from(copy, { y: 28, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity" }, 0.4);
};

/** Menu steps: the card rises and its number pops in like a sticker. */
const dealStep = (step: HTMLElement, delay: number) => {
  gsap
    .timeline({ delay })
    .fromTo(
      step,
      { opacity: 0, y: 56 },
      { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", clearProps: "transform,opacity" },
      0,
    )
    .fromTo(
      step,
      { "--pop": 0, "--pop-r": "-120deg" },
      { "--pop": 1, "--pop-r": "0deg", duration: 0.9, ease: "back.out(2.6)", clearProps: "--pop,--pop-r" },
      0.3,
    );
};

const rise = (element: HTMLElement, delay: number) =>
  gsap.fromTo(
    element,
    { opacity: 0, y: 56 },
    { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay, clearProps: "transform,opacity" },
  );

const reveal = (element: HTMLElement, delay: number) => {
  if (element.classList.contains("photo-card")) dealCard(element, delay);
  else if (element.classList.contains("cta-card")) dealCta(element, delay);
  else if (element.classList.contains("step")) dealStep(element, delay);
  else rise(element, delay);
};

/* One place for every GSAP interaction. Re-runs on each route change and
   respects prefers-reduced-motion (content simply shows, no animation). */
export default function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const intro = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);

  /* Route transitions + smooth in-page anchors. Registered once. */
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const onClick = (event: MouseEvent) => {
      if (
        !motionOk.matches ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const href = url.pathname + url.search + url.hash;
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;

      if (navState.covering) {
        event.preventDefault();
        return;
      }

      if (samePage) {
        /* Same page: glide to the section (or to the top) instead of jumping. */
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
        if (url.hash && !target) return;
        event.preventDefault();
        if (url.hash !== window.location.hash) router.push(href, { scroll: false });
        gsap.to(window, {
          scrollTo: target ? { y: target, offsetY: 96, autoKill: true } : { y: 0, autoKill: true },
          duration: 1.3,
          ease: "expo.inOut",
          overwrite: true,
        });
        return;
      }

      const el = curtain.current;
      if (!el) return;
      event.preventDefault();
      navState.covering = true;
      coverCurtain(el, () => {
        if (!url.hash) window.scrollTo(0, 0);
        router.push(href);
      });
      /* If the route never arrives, don't leave the person staring at pink. */
        navState.timer?.kill();
        navState.timer = gsap.delayedCall(6, () => {
          if (!navState.covering) return;
          navState.covering = false;
          navState.timer = null;
          liftCurtain(el);
        });
    };

    /* Capture phase so we run before Next's own <Link> handler, which skips
       any click that has already been default-prevented. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
  const root = document.documentElement;
  const mm = gsap.matchMedia();
  const frame = requestAnimationFrame(() => {
  
  mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("js", "intro-on");
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.classList.add("js");
      const cleanups: (() => void)[] = [];

      const playIntro = root.classList.contains("intro-on");
      const covered = navState.covering;
      /* When hero content should start, relative to now. */
      const heroAt = playIntro ? 1.2 : covered ? 0.8 : 0.1;

      /* ---------- intro: the tray lid ---------- */
      if (playIntro && intro.current) {
        const mark = intro.current.querySelector<HTMLElement>(".intro-mark");
        if (mark) {
          gsap
            .timeline({ onComplete: () => root.classList.remove("intro-on") })
            .from(mark, { yPercent: 40, scale: 0.85, opacity: 0, duration: 0.95, ease: "expo.out" }, 0.1)
            .to(mark, { yPercent: -60, duration: 0.9, ease: "expo.inOut" }, 1)
            .to(intro.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 1);
        }
      }

      /* ---------- route curtain lifts once the new page is mounted ---------- */
      if (covered && curtain.current) {
        navState.covering = false;
        navState.timer?.kill();
        navState.timer = null;
        liftCurtain(curtain.current);
      }

      /* ---------- headings: words rise out of a line mask ---------- */
      all("[data-split]").forEach((element) => {
        const hero = element.closest(".section--hero");
        SplitText.create(element, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            element.classList.add("is-set");
            return gsap.from(self.words, {
              yPercent: 120,
              rotate: 5,
              transformOrigin: "0% 100%",
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.055,
              delay: hero ? heroAt : 0,
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          },
        });
      });

      /* ---------- scroll-linked paragraph: words ink in as you read ---------- */
      all("[data-scrub]").forEach((element) => {
        SplitText.create(element, {
          type: "words",
          autoSplit: true,
          onSplit: (self) => {
            element.classList.add("is-set");
            return gsap.fromTo(
              self.words,
              { opacity: 0.2 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.12,
                /* Finishes before the paragraph reaches mid-screen, so it is
                   fully readable when someone jumps straight to #about. */
                scrollTrigger: { trigger: element, start: "top 90%", end: "bottom 74%", scrub: true },
              },
            );
          },
        });
      });

      /* ---------- eyebrows: the pink square pops in ---------- */
      const eyebrows = all(".eyebrow");
      gsap.set(eyebrows, { "--sq-s": 0, "--sq-r": "-90deg" });
      eyebrows.forEach((eyebrow) => {
        const hero = eyebrow.closest(".section--hero");
        ScrollTrigger.create({
          trigger: eyebrow,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(eyebrow, {
              "--sq-s": 1,
              "--sq-r": "0deg",
              duration: 0.9,
              ease: "back.out(3)",
              delay: hero ? heroAt + 0.3 : 0.25,
            }),
        });
      });

      /* ---------- hero entrance ---------- */
      const heroItems = all("[data-hero-item]");
      if (heroItems.length) {
        gsap.set(heroItems, { opacity: 0, y: 32 });
        markSet(heroItems);
        gsap.to(heroItems, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          delay: heroAt + 0.25,
          clearProps: "transform,opacity",
        });
      }

      const heroMedia = all("[data-hero-media]");
      if (heroMedia.length) {
        const card = heroMedia[0].querySelector<HTMLElement>(".photo-card");
        const photo = heroMedia[0].querySelector<HTMLElement>(".photo-card-media img");
        const tape = heroMedia[0].querySelector<HTMLElement>(".washi");
        const sticker = heroMedia[0].querySelector<HTMLElement>(".badge");
        gsap.set(heroMedia, { opacity: 0 });
        markSet(heroMedia);

        const tl = gsap.timeline({ delay: heroAt });
        tl.fromTo(
          heroMedia,
          { opacity: 0, y: 120, rotate: -8, scale: 0.9 },
          { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.7, ease: "expo.out" },
          0,
        );
        if (card) {
          tl.fromTo(card, { "--tilt": "0deg" }, { "--tilt": "2.5deg", duration: 1.3, ease: "back.out(1.7)" }, 0.25);
        }
        if (photo) tl.fromTo(photo, { scale: 1.24 }, { scale: 1, duration: 2, ease: "expo.out", clearProps: "transform" }, 0);
        if (tape) {
          tl.fromTo(
            tape,
            { scale: 0, rotate: -30, opacity: 0 },
            { scale: 1, rotate: -4, opacity: 1, duration: 0.7, ease: "back.out(2.6)", clearProps: "transform,opacity" },
            0.8,
          );
        }
        if (sticker) {
          tl.fromTo(sticker, { scale: 0, rotate: -140 }, { scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.8)" }, 0.95);
        }

        gsap.to(heroMedia, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: ".section--hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
      /* Hero copy drifts and softens as it leaves. */
      const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
      if (heroCopy) {
        gsap.to(heroCopy, {
          yPercent: 8,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: ".section--hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* ---------- cards and blocks: dealt in, batched ---------- */
      const cards = all("[data-reveal]");
      gsap.set(cards, { opacity: 0 });
      markSet(cards);
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => batch.forEach((element, index) => reveal(element as HTMLElement, index * 0.12)),
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
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            clearProps: "transform,opacity",
          }),
      });

      /* ---------- scroll velocity drives the marquee and the badge ---------- */
      const marqueeTrack = document.querySelector<HTMLElement>("[data-marquee]");
      const loop = marqueeTrack
        ? gsap.to(marqueeTrack, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })
        : null;
      /* Start deep inside the loop so it can run backwards without hitting zero. */
      loop?.totalTime(loop.duration() * 50);
      const stamp = document.querySelector<HTMLElement>("[data-badge]");
      const spin = stamp
        ? gsap.to(stamp, { rotation: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%" })
        : null;
      if (marqueeTrack) gsap.set(marqueeTrack, { skewX: 0 });
      const skew = marqueeTrack ? gsap.quickTo(marqueeTrack, "skewX", { duration: 0.6, ease: "power3" }) : null;

      let direction = 1;
      let calm = 0;
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction !== 0) direction = self.direction;
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(0, 7, Math.abs(velocity) / 380);
          if (loop) {
            loop.timeScale(direction * (1 + boost));
            gsap.to(loop, { timeScale: direction, duration: 0.9, ease: "power2.out", overwrite: true });
          }
          if (spin) {
            spin.timeScale(1 + boost * 0.8);
            gsap.to(spin, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
          }
          skew?.(gsap.utils.clamp(-4, 4, -velocity / 500));
          window.clearTimeout(calm);
          calm = window.setTimeout(() => skew?.(0), 90);
        },
      });
      cleanups.push(() => window.clearTimeout(calm));

      /* ---------- photo band: the torn paper peels back as it scrolls in ---------- */
      all("[data-band]").forEach((band) => {
        const image = band.querySelector("[data-band-img]");
        const tear = band.querySelector("[data-band-tear]");
        if (tear) {
          gsap.fromTo(
            tear,
            { yPercent: 0 },
            {
              yPercent: -45,
              ease: "none",
              scrollTrigger: { trigger: band, start: "top 90%", end: "top 10%", scrub: true },
            },
          );
        }
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* ---------- footer ---------- */
      const footerBits = all(".footer-top > *, .footer-base");
      if (footerBits.length) {
        gsap.from(footerBits, {
          y: 48,
          opacity: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".section--footer", start: "top 70%", once: true },
        });
      }

      /* ---------- navbar ---------- */
      const nav = document.querySelector<HTMLElement>(".navbar");
      if (nav) {
        /* The bar lives in the layout, so it outlives the page. Its hide tween is
           created from a scroll callback, which this context does not revert: left
           alone, a bar hidden on the old page stayed hidden on the new one. Every
           page starts with it showing. */
        gsap.killTweensOf(nav);
        gsap.set(nav, { yPercent: 0 });
        cleanups.push(() => {
          gsap.killTweensOf(nav);
          gsap.set(nav, { clearProps: "transform" });
        });

        let hidden = false;
        const arrived = performance.now();
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            nav.classList.toggle("is-scrolled", self.scroll() > 12);
            if (nav.classList.contains("is-open")) return;
            /* A jump to a hash or a restored scroll position on arrival is not
               the reader scrolling down, so it must not hide the bar. */
            const settled = performance.now() - arrived > 1200;
            const shouldHide = settled && self.direction === 1 && self.scroll() > 240;
            if (shouldHide === hidden) return;
            hidden = shouldHide;
            gsap.to(nav, {
              yPercent: hidden ? -160 : 0,
              duration: 0.55,
              ease: "expo.out",
              overwrite: "auto",
            });
          },
        });

        /* Mobile menu: links drop in one after another. */
        let wasOpen = false;
        const observer = new MutationObserver(() => {
          const open = nav.classList.contains("is-open");
          if (open && !wasOpen) {
            gsap.from(nav.querySelectorAll(".nav-link"), {
              y: -14,
              opacity: 0,
              duration: 0.7,
              stagger: 0.05,
              ease: "expo.out",
              clearProps: "transform,opacity",
            });
          }
          wasOpen = open;
        });
        observer.observe(nav, { attributes: true, attributeFilter: ["class"] });
        cleanups.push(() => observer.disconnect());
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const frame = requestAnimationFrame(refresh);
      return () => {
        window.removeEventListener("load", refresh);
        cancelAnimationFrame(frame);
        cleanups.forEach((cleanup) => cleanup());
      };
    });

    /* Desktop nav: one highlight glides between links. */
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 760px)",
      () => {
        const nav = document.querySelector<HTMLElement>(".navbar");
        const glide = nav?.querySelector<HTMLElement>(".nav-glide");
        if (!nav || !glide) return;
        const links = all<HTMLElement>(".navbar .nav-link:not(.nav-link--cta)");
        const current = () => nav.querySelector<HTMLElement>('.nav-link[aria-current="page"]');
        nav.classList.add("has-glide");

        const place = (link: HTMLElement | null) => {
          if (!link) {
            gsap.to(glide, { opacity: 0, duration: 0.3, overwrite: "auto" });
            return;
          }
          const box = { x: link.offsetLeft, y: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight };
          if (Number(gsap.getProperty(glide, "opacity")) < 0.05) gsap.set(glide, box);
          gsap.to(glide, { ...box, opacity: 1, duration: 0.6, ease: "expo.out", overwrite: "auto" });
        };

        const off = () => place(current());
        const cleanups: (() => void)[] = [];
        links.forEach((link) => {
          const on = () => place(link);
          link.addEventListener("pointerenter", on);
          link.addEventListener("focus", on);
          link.addEventListener("blur", off);
          cleanups.push(() => {
            link.removeEventListener("pointerenter", on);
            link.removeEventListener("focus", on);
            link.removeEventListener("blur", off);
          });
        });
        const group = nav.querySelector<HTMLElement>(".nav-menu");
        group?.addEventListener("pointerleave", off);
        cleanups.push(() => group?.removeEventListener("pointerleave", off));

        const start = current();
        if (start) {
          gsap.set(glide, { x: start.offsetLeft, y: start.offsetTop, width: start.offsetWidth, height: start.offsetHeight, opacity: 1 });
        }
        return () => {
          nav.classList.remove("has-glide");
          cleanups.forEach((cleanup) => cleanup());
        };
      },
    );

    /* Pointer-only extras: magnetic buttons, cursor tag, hero depth. */
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const cleanups: (() => void)[] = [];

        /* Magnet runs through CSS variables so it never fights the buttons'
           own :hover / :active translate. */
        all(".btn").forEach((button) => {
          const x = gsap.quickTo(button, "--mx", { duration: 0.6, ease: "power3" });
          const y = gsap.quickTo(button, "--my", { duration: 0.6, ease: "power3" });
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

        /* The "order now" tag follows the cursor and leans into the motion. */
        all("[data-cursor-tag]").forEach((card) => {
          const tag = card.querySelector<HTMLElement>(".cursor-tag");
          if (!tag) return;
          gsap.set(tag, { xPercent: -50, yPercent: -150, scale: 0.6 });
          const x = gsap.quickTo(tag, "x", { duration: 0.45, ease: "power3" });
          const y = gsap.quickTo(tag, "y", { duration: 0.45, ease: "power3" });
          const lean = gsap.quickTo(tag, "rotation", { duration: 0.5, ease: "power3" });
          let settle = 0;
          const move = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            x(event.clientX - rect.left);
            y(event.clientY - rect.top);
            lean(gsap.utils.clamp(-14, 14, event.movementX * 0.9));
            window.clearTimeout(settle);
            settle = window.setTimeout(() => lean(0), 90);
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
            window.clearTimeout(settle);
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          });
        });

        /* Hero depth: the photo tilts toward the pointer, the badge drifts the other way. */
        const hero = document.querySelector<HTMLElement>(".section--hero");
        const heroCard = hero?.querySelector<HTMLElement>(".hero-media .photo-card");
        const heroBadge = hero?.querySelector<HTMLElement>(".hero-media .badge");
        if (hero && heroCard) {
          gsap.set(heroCard, { transformPerspective: 1100 });
          const rx = gsap.quickTo(heroCard, "rotationX", { duration: 0.9, ease: "power3" });
          const ry = gsap.quickTo(heroCard, "rotationY", { duration: 0.9, ease: "power3" });
          const bx = heroBadge ? gsap.quickTo(heroBadge, "x", { duration: 1.1, ease: "power3" }) : null;
          const by = heroBadge ? gsap.quickTo(heroBadge, "y", { duration: 1.1, ease: "power3" }) : null;
          const move = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            ry(nx * 9);
            rx(-ny * 9);
            bx?.(nx * -22);
            by?.(ny * -22);
          };
          const leave = () => {
            ry(0);
            rx(0);
            bx?.(0);
            by?.(0);
          };
          hero.addEventListener("pointermove", move);
          hero.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            hero.removeEventListener("pointermove", move);
            hero.removeEventListener("pointerleave", leave);
          });
        }

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    });

  return () => {
    cancelAnimationFrame(frame);
    mm.revert();
  };
  }, [pathname]);

  return (
    <>
      <div className="intro" ref={intro} aria-hidden="true">
        <div className="intro-mark">
          <Logo className="intro-logo" sizes="(min-width: 640px) 28rem, 70vw" priority />
        </div>
      </div>
      <div className="curtain" ref={curtain} aria-hidden="true">
        <Logo className="curtain-logo" sizes="(min-width: 640px) 28rem, 70vw" />
      </div>
    </>
  );
}

"use client";

import gsap from "gsap";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Arrow from "./Arrow";

/* Sample copy: swap for real customer messages before launch. */
const testimonials = [
  {
    title: "Meat pie perfection",
    body: "I ordered a tray for the office and they disappeared in ten minutes. The crust is unreal.",
    who: "Ngozi A., Office Regular",
    img: "/images/testimonial-1.jpg",
    alt: "A customer holding a La Crave meat pie",
  },
  {
    title: "My birthday cake!",
    body: "I sent a blurry screenshot from Pinterest and got back exactly what I imagined, but better.",
    who: "Temi O., Birthday Girl",
    img: "/images/testimonial-2.jpg",
    alt: "A customer with her La Crave birthday cake",
  },
  {
    title: "Brownies that slap",
    body: "Ordered one box to share. Ate most of it in the car. Zero regrets.",
    who: "Ike W., Brownie Addict",
    img: "/images/testimonial-3.jpg",
    alt: "A customer holding a box of La Crave brownies",
  },
  {
    title: "Better than my mum's",
    body: "The banana bread is dangerously soft. My family finished it before dinner.",
    who: "Ada K., Banana Bread Fan",
    img: "/images/testimonial-4.jpg",
    alt: "A customer with a loaf of La Crave banana bread",
  },
  {
    title: "Delivered same day",
    body: "Messaged in the morning, had warm meat pies by afternoon. That's service.",
    who: "Tunde B., Same-Day Regular",
    img: "/images/testimonial-5.jpg",
    alt: "A customer receiving a same-day La Crave delivery",
  },
  {
    title: "Cake of the year",
    body: "Our wedding cake got more compliments than the dress code.",
    who: "Chiara & Sam, Newlyweds",
    img: "/images/testimonial-6.jpg",
    alt: "A wedding cake made by La Crave",
  },
];

const QUERY = "(max-width: 991px)";
const subscribe = (notify: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};
const isCompact = () => window.matchMedia(QUERY).matches;

export default function TestimonialsSection() {
  const compact = useSyncExternalStore(subscribe, isCompact, () => false);
  const perView = compact ? 1 : 2;
  const pages: (typeof testimonials)[] = [];
  for (let i = 0; i < testimonials.length; i += perView) {
    pages.push(testimonials.slice(i, i + perView));
  }

  const [index, setIndex] = useState(0);
  const current = Math.min(index, pages.length - 1);
  const track = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (!track.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = !ready.current || reduce ? 0 : 0.8;
    ready.current = true;
    const tween = gsap.to(track.current, {
      xPercent: -100 * current,
      duration,
      ease: "expo.inOut",
      overwrite: "auto",
    });
    /* The cards on the incoming slide get dealt in as it arrives. */
    const incoming = track.current.children[current]?.querySelectorAll(".photo-card");
    const settle =
      duration && incoming?.length
        ? gsap.fromTo(
            incoming,
            { y: 56, rotate: (index: number) => (index % 2 ? -4 : 4) },
            { y: 0, rotate: 0, duration: 1.3, delay: 0.25, ease: "expo.out", stagger: 0.09, clearProps: "transform" },
          )
        : null;
    return () => {
      tween.kill();
      settle?.progress(1).kill();
    };
  }, [current, pages.length]);

  const go = (target: number) =>
    setIndex((target + pages.length) % pages.length);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(current - 1);
    if (event.key === "ArrowRight") go(current + 1);
  };
  const dragging = useRef(false);
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX.current = event.clientX;
    dragging.current = false;
  };
  const onPointerMove = (event: PointerEvent) => {
    if (startX.current === null || !track.current) return;
    const delta = event.clientX - startX.current;
    if (!dragging.current && Math.abs(delta) < 6) return;
    if (!dragging.current && event.pointerType === "mouse") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragging.current = true;
    /* Resist a little so the slide feels weighted, not glued to the pointer. */
    gsap.to(track.current, { x: delta * 0.8, duration: 0.25, ease: "power3.out", overwrite: "auto" });
  };
  const release = (event: PointerEvent) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    dragging.current = false;
    if (track.current) gsap.to(track.current, { x: 0, duration: 0.9, ease: "expo.out", overwrite: "auto" });
    if (Math.abs(delta) > 60) go(current + (delta < 0 ? 1 : -1));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-fade>
            Kind words
          </span>
          <h2 className="display-2" data-split>
            Love letters AND crumb trails
          </h2>
          <p className="lead" data-fade>
            Every box comes with a story. Here are a few of the messages that
            landed in our DMs after the wrappers came off.
          </p>
        </div>
        <div className="section-gap" />
        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer messages"
          onKeyDown={onKeyDown}
          data-fade
        >
          <div
            className="carousel-viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={release}
            onPointerCancel={release}
          >
            <div className="carousel-track" ref={track}>
              {pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="carousel-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${pageIndex + 1} of ${pages.length}`}
                  aria-hidden={pageIndex !== current}
                >
                  <div
                    className="carousel-cards"
                    style={{ "--per-view": perView } as React.CSSProperties}
                  >
                    {page.map((card, cardIndex) => (
                      <figure
                        key={card.who}
                        className={`photo-card quote-card${cardIndex % 2 === 1 ? " photo-card--alt" : ""}`}
                        style={{ margin: 0 }}
                      >
                        <div className="photo-card-inner">
                          <div className="photo-card-media">
                            <Image
                              src={card.img}
                              alt={card.alt}
                              fill
                              sizes="(min-width: 992px) 20rem, 90vw"
                            />
                          </div>
                          <figcaption className="quote-body">
                            <span className="pill">{card.title}</span>
                            <p>{card.body}</p>
                            <span className="quote-who">{card.who}</span>
                          </figcaption>
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="round-btn"
              aria-label="Previous slide"
              onClick={() => go(current - 1)}
            >
              <Arrow dir="left" />
            </button>
            <div className="dots">
              {pages.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className="dot"
                  aria-label={`Go to slide ${pageIndex + 1}`}
                  aria-current={pageIndex === current}
                  onClick={() => go(pageIndex)}
                />
              ))}
            </div>
            <button
              type="button"
              className="round-btn"
              aria-label="Next slide"
              onClick={() => go(current + 1)}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

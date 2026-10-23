"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  images: { src: string }[];
  /** Milliseconds each photo stays up. */
  interval?: number;
  /** Which photo shows first, so two carousels on one page never match. */
  start?: number;
  sizes?: string;
  /** Preload the first photo (use for the hero). */
  priority?: boolean;
};

const FADE = 1400;

/** Full-bleed photo carousel for section backgrounds. Photos dissolve into
    each other with a slow push-in. It only runs while it is on screen and
    the tab is visible, and holds still for prefers-reduced-motion. */
export default function BgCarousel({ images, interval = 5500, start = 0, sizes = "100vw", priority }: Props) {
  const count = images.length;
  const root = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ index: count ? start % count : 0, prev: -1 });

  useEffect(() => {
    const element = root.current;
    if (!element || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    let timer = 0;
    const stop = () => window.clearInterval(timer);
    const sync = () => {
      stop();
      if (onScreen && !document.hidden) {
        timer = window.setInterval(
          () => setPos((current) => ({ index: (current.index + 1) % count, prev: current.index })),
          interval,
        );
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, [count, interval]);

  if (!count) return null;

  return (
    <div
      className="bg-carousel"
      ref={root}
      aria-hidden="true"
      style={{ "--fade": `${FADE}ms`, "--push": `${interval + FADE + 600}ms` } as CSSProperties}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={
            index === pos.index ? "bg-slide is-active" : index === pos.prev ? "bg-slide is-prev" : "bg-slide"
          }
        >
          <Image src={image.src} alt="" fill sizes={sizes} priority={priority && index === start % count} />
        </div>
      ))}
    </div>
  );
}

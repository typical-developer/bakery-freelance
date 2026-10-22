"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { INSTAGRAM, WHATSAPP } from "../site";

/** Floating contact widget in the brand colour. One tap opens the two ways
    to reach the bakery; the options pop out of the button one by one. */
export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useRef(false);

  /* Arrives after the intro, like the rest of the page. */
  useEffect(() => {
    const button = toggle.current;
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.from(button, {
      scale: 0,
      rotate: -25,
      transformOrigin: "100% 100%",
      duration: 0.9,
      ease: "back.out(2)",
      delay: document.documentElement.classList.contains("intro-on") ? 2.4 : 1,
      clearProps: "transform",
    });
    return () => {
      tween.revert();
    };
  }, []);

  /* Options pop out when opened. */
  useEffect(() => {
    const items = root.current?.querySelectorAll(".widget-panel > li");
    if (!items?.length) return;
    const first = !ready.current;
    ready.current = true;
    if (first || !open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      items,
      { y: 18, scale: 0.88, opacity: 0, transformOrigin: "100% 100%" },
      { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", stagger: -0.07, clearProps: "transform,opacity" },
    );
    return () => {
      tween.progress(1).kill();
    };
  }, [open]);

  /* Escape or a tap elsewhere closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="widget" ref={root} data-open={open}>
      <ul className="widget-panel" id="contact-panel" aria-hidden={!open}>
        <li>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="btn"
            tabIndex={open ? 0 : -1}
          >
            order on whatsapp
          </a>
        </li>
        <li>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="btn btn--white"
            tabIndex={open ? 0 : -1}
          >
            dm on instagram
          </a>
        </li>
      </ul>
      <button
        ref={toggle}
        type="button"
        className="widget-toggle"
        aria-expanded={open}
        aria-controls="contact-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 12a7.5 7.5 0 0 1-10.9 6.7L4 20l1.4-4.4A7.5 7.5 0 1 1 20 12Z" />
        </svg>
        message us
      </button>
    </div>
  );
}

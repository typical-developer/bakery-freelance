"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onMenu = pathname.startsWith("/menu");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={open ? "navbar is-open" : "navbar"}>
      <div className="nav-inner">
        <Link href="/" className="brand brand--mobile" aria-label="La Crave home">
          <Logo className="logo-mark" sizes="6rem" priority />
        </Link>
        <nav
          id="nav-menu"
          className="nav-menu"
          aria-label="Main"
          onClick={() => setOpen(false)}
        >
          <span className="nav-glide" aria-hidden="true" />
          <div className="nav-group">
            <Link href="/#about" className="nav-link">
              About
            </Link>
            <Link
              href="/menu"
              className="nav-link"
              aria-current={onMenu ? "page" : undefined}
            >
              Menu
            </Link>
          </div>
          <Link href="/" className="brand brand--desktop" aria-label="La Crave home">
            <Logo className="logo-mark" sizes="6rem" priority />
          </Link>
          <div className="nav-group">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">
              Contact
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-link--cta"
            >
              Order
            </a>
          </div>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="nav-menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        />
      </div>
    </header>
  );
}

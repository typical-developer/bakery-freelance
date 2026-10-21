"use client";

import { useState } from "react";
import Wordmark from "./Wordmark";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={open ? "navbar is-open" : "navbar"}>
      <div className="nav-content-wrapper">
        <a href="#top" className="brand-logo-mobile" aria-label="La Crave home">
          <Wordmark className="logo-mark logo-mark-mobile" />
        </a>
        <nav
          id="nav-menu"
          className="nav-menu-item-wrapper"
          onClick={() => setOpen(false)}
        >
          <div className="nav-menu-item">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#menu" className="nav-link">
              Menu
            </a>
          </div>
          <a href="#top" className="brand-logo-web" aria-label="La Crave home">
            <Wordmark className="logo-mark" />
          </a>
          <div className="nav-menu-item">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              Contact
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              Order
            </a>
          </div>
        </nav>
        <button
          type="button"
          className="nav-hamburger-icon"
          aria-label="menu"
          aria-controls="nav-menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        />
      </div>
    </header>
  );
}

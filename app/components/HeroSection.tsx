import Link from "next/link";
import PhotoCard from "./PhotoCard";
import { WHATSAPP } from "../site";

function Badge() {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120" data-badge>
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#ffe156" stroke="#2c2c2d" strokeWidth="1.5" />
        <text
          fontFamily="var(--font-display), system-ui, sans-serif"
          fontSize="11.5"
          fill="#2c2c2d"
          letterSpacing="1"
        >
          <textPath href="#badge-circle" textLength="270" lengthAdjust="spacing">
            BAKED FRESH DAILY • SAME-DAY DELIVERY •
          </textPath>
        </text>
        <rect x="50" y="50" width="20" height="20" rx="4" fill="#ff6ba1" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="section--hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow" data-hero-item>
            Port Harcourt bakery
          </span>
          <h1 className="display-1" data-split>
            flaky pastries, beautiful cakes
          </h1>
          <p className="lead" data-hero-item>
            Fan-favourite meat pies, custom cakes, banana bread and brownies.
            Baked fresh in Port Harcourt and delivered the same day, every
            single day.
          </p>
          <div className="actions" data-hero-item>
            <Link href="/menu" className="btn">
              explore our menu
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn--ghost">
              order on whatsapp
            </a>
          </div>
          <ul className="hero-meta" data-hero-item>
            <li>Baked to order</li>
            <li>Same-day delivery</li>
            <li>Custom cakes</li>
          </ul>
        </div>
        <div className="hero-media" data-hero-media>
          <PhotoCard
            img="/images/hero-storefront.jpg"
            alt="A tray of freshly baked La Crave meat pies"
            sizes="(min-width: 992px) 27rem, 90vw"
            tag="#craveworthy"
            reveal={false}
            priority
          />
          <Badge />
        </div>
      </div>
    </section>
  );
}

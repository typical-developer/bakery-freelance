"use client";

import type { MouseEvent } from "react";
import { WHATSAPP } from "../site";

const products = [
  {
    name: "Pastry Box",
    price: "7,500",
    img: "/images/item-pastry-box.jpg",
    alt: "A box of assorted La Crave pastries",
  },
  {
    name: "Custom Cake",
    price: "25,000",
    img: "/images/item-cake.jpg",
    alt: "A custom La Crave celebration cake",
  },
  {
    name: "Brownies",
    price: "5,000",
    img: "/images/item-brownies.jpg",
    alt: "A box of fudgy La Crave brownies",
  },
];

/* IX2 a-9: the popup centre tracks the cursor, mapped to ±80% / ±160% of its own size. */
function trackCursor(event: MouseEvent<HTMLAnchorElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 160 - 80;
  const y = ((event.clientY - rect.top) / rect.height) * 320 - 160;
  event.currentTarget.style.setProperty("--px", `${x.toFixed(1)}%`);
  event.currentTarget.style.setProperty("--py", `${y.toFixed(1)}%`);
}

export default function LineupSection() {
  return (
    <section className="section" id="lineup">
      <div className="default-container">
        <div className="headline-container-grid">
          <h2 className="h2-header">today&apos;s sweet lineup</h2>
          <div className="vertical-flex lineup-cta">
            <p className="body-base">
              Fresh out of the oven today. Every box is baked to order — send us
              a message and we&apos;ll get it to you the same day.
            </p>
            <div className="space-lg" />
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary">
              order on whatsapp
            </a>
          </div>
        </div>
        <div className="space-4xl" />
        <div className="collection-list">
          {products.map((product) => (
            <div key={product.name} className="padding-sm">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="menu-item-link-wrapper"
                onMouseMove={trackCursor}
              >
                <div className="menu-item-card" data-reveal>
                  <div className="menu-item-bg-div" />
                  <div className="menu-item-content">
                    <div className="menu-img-wrapper">
                      <img
                        src={product.img}
                        alt={product.alt}
                        className="menu-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="horizontal-flex">
                      <div className="header-md">{product.name}</div>
                      <div className="price-tag">
                        <div className="body-sm">₦</div>
                        <div className="header-xs">{product.price}</div>
                      </div>
                    </div>
                  </div>
                  <div className="washi-tape-wrapper-02">
                    <img
                      src="/icons/washi-mint.svg"
                      alt=""
                      className="washi-tape"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="highlight-text-popup">
                  <span>#craveworthy</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

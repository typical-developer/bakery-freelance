"use client";

import PhotoCard from "./PhotoCard";
import { WHATSAPP } from "../site";
import type { MenuItem } from "../menu-data";

export default function MenuBrowser({ menu }: { menu: MenuItem[] }) {
  return (
    <div className="menu-browser">
      <div className="grid-3 menu-grid">
          {menu.map((item, index) => (
            <PhotoCard key={item.id} href={WHATSAPP} external img={item.img} alt={item.alt} sizes="(min-width: 992px) 24rem, (min-width: 640px) 45vw, 90vw" cursorTag="order now" flip={index % 2 === 1}>
              <div className="photo-card-body">
                <div className="photo-card-row">
                  <h2 className="title-3">{item.name}</h2>
                  {item.price ? <span className="price"><small>₦</small><span>{item.price}</span></span> : <span className="price price--ask">Message for price</span>}
                </div>
                {item.blurb ? <p className="small">{item.blurb}</p> : null}
              </div>
            </PhotoCard>
          ))}
        </div>
    </div>
  );
}

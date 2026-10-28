"use client";

import { useMemo, useState } from "react";
import PhotoCard from "./PhotoCard";
import { WHATSAPP } from "../site";
import type { MenuItem } from "../menu-data";

export default function MenuBrowser({ menu }: { menu: MenuItem[] }) {
  const groups = ["All", ...new Set(menu.map((item) => item.group))];
  const [activeGroup, setActiveGroup] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesGroup = activeGroup === "All" || item.group === activeGroup;
      const matchesQuery = !normalized || `${item.name} ${item.group} ${item.blurb}`.toLowerCase().includes(normalized);
      return matchesGroup && matchesQuery;
    });
  }, [activeGroup, menu, query]);

  return (
    <div className="menu-browser">
      <div className="menu-controls">
        <div className="menu-tabs" aria-label="Filter menu categories" role="group">
          {groups.map((group) => (
            <button key={group} type="button" className={activeGroup === group ? "is-active" : ""} aria-pressed={activeGroup === group} onClick={() => setActiveGroup(group)}>
              {group}
            </button>
          ))}
        </div>
        <label className="menu-search">
          <span className="sr-only">Search the menu</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu" />
        </label>
      </div>
      {filtered.length ? (
        <div className="grid-3 menu-grid">
          {filtered.map((item, index) => (
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
      ) : (
        <div className="menu-empty" role="status">
          <h2 className="title-3">Nothing found just yet.</h2>
          <p>Can&apos;t see what you&apos;re looking for? Message us for more enquiries and we&apos;ll help you find the right bake.</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn">make an enquiry</a>
        </div>
      )}
    </div>
  );
}

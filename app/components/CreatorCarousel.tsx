"use client";

import gsap from "gsap";
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import CreatorVideo from "./CreatorVideo";
import PhotoCard from "./PhotoCard";
import Arrow from "./Arrow";
import type { Creator } from "../media";

const QUERY = "(max-width: 991px)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const isCompact = () => window.matchMedia(QUERY).matches;

export default function CreatorCarousel({ creators }: { creators: Creator[] }) {
  const compact = useSyncExternalStore(subscribe, isCompact, () => false);
  const perView = compact ? 1 : 2;
  const pages: Creator[][] = [];
  for (let i = 0; i < creators.length; i += perView) pages.push(creators.slice(i, i + perView));
  const [index, setIndex] = useState(0);
  const current = Math.min(index, Math.max(0, pages.length - 1));
  const track = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (!track.current) return;
    const tween = gsap.to(track.current, { xPercent: -100 * current, duration: 0.8, ease: "expo.inOut", overwrite: "auto" });
    return () => {
      tween.kill();
    };
  }, [current]);

  const go = (target: number) => setIndex((target + pages.length) % pages.length);
  const onPointerDown = (event: PointerEvent) => { startX.current = event.clientX; };
  const onPointerUp = (event: PointerEvent) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) > 60) go(current + (delta < 0 ? 1 : -1));
  };

  return (
    <div className="carousel creator-carousel" role="region" aria-roledescription="carousel" aria-label="Featured creators">
      <div className="carousel-viewport" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <div className="carousel-track" ref={track}>
          {pages.map((page, pageIndex) => (
            <div className="carousel-slide" key={pageIndex} role="group" aria-roledescription="slide" aria-label={`${pageIndex + 1} of ${pages.length}`} aria-hidden={pageIndex !== current}>
              <div className="carousel-cards" style={{ "--per-view": perView } as React.CSSProperties}>
                {page.map((creator, cardIndex) => (
                  <PhotoCard key={creator.id} flip={cardIndex % 2 === 1} media={creator.video ? <CreatorVideo src={creator.video} poster={creator.poster} label={creator.name} /> : <div className="creator-soon"><span className="creator-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span><span>Video coming soon</span></div>}>
                    {creator.video ? <div className="photo-card-body"><div className="photo-card-row"><h3 className="title-3">{creator.name}</h3>{creator.handle ? <span className="creator-handle">{creator.handle}</span> : null}</div>{creator.quote ? <p className="small">{creator.quote}</p> : null}</div> : null}
                  </PhotoCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" className="round-btn" aria-label="Previous creator" onClick={() => go(current - 1)}><Arrow dir="left" /></button>
        <div className="dots">{pages.map((_, pageIndex) => <button key={pageIndex} type="button" className="dot" aria-label={`Go to creator slide ${pageIndex + 1}`} aria-current={pageIndex === current} onClick={() => go(pageIndex)} />)}</div>
        <button type="button" className="round-btn" aria-label="Next creator" onClick={() => go(current + 1)}><Arrow /></button>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import CreatorVideo from "./CreatorVideo";
import PhotoCard from "./PhotoCard";
import type { Creator } from "../media";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export default function CreatorCarousel({ creators }: { creators: Creator[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function moveCarousel(direction: "left" | "right") {
    carouselRef.current?.scrollBy({
      left: direction === "right" ? carouselRef.current.clientWidth * 0.78 : -carouselRef.current.clientWidth * 0.78,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="creator-controls" aria-label="Creator carousel controls">
        <button type="button" className="creator-control" onClick={() => moveCarousel("left")} aria-label="Previous creator">
          <ArrowIcon direction="left" />
        </button>
        <span className="creator-control-label">Swipe to explore</span>
        <button type="button" className="creator-control" onClick={() => moveCarousel("right")} aria-label="Next creator">
          <ArrowIcon direction="right" />
        </button>
      </div>
      <div className="creator-row" ref={carouselRef}>
        {creators.map((creator, index) => (
          <PhotoCard
            key={creator.id}
            flip={index % 2 === 1}
            media={
              creator.video ? (
                <CreatorVideo src={creator.video} poster={creator.poster} label={creator.name} />
              ) : (
                <div className="creator-soon">
                  <span className="creator-play" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span>Video coming soon</span>
                </div>
              )
            }
          >
            {creator.video ? (
              <div className="photo-card-body">
                <div className="photo-card-row">
                  <h3 className="title-3">{creator.name}</h3>
                  {creator.handle ? (
                    creator.href ? (
                      <a href={creator.href} target="_blank" rel="noreferrer" className="creator-handle">
                        {creator.handle}
                      </a>
                    ) : (
                      <span className="creator-handle">{creator.handle}</span>
                    )
                  ) : null}
                </div>
                {creator.quote ? <p className="small">{creator.quote}</p> : null}
              </div>
            ) : null}
          </PhotoCard>
        ))}
      </div>
    </>
  );
}

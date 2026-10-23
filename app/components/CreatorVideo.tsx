"use client";

import { useEffect, useRef, useState } from "react";

const SOUND_EVENT = "lc-creator-sound";

function Icon({ path }: { path: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

/** A creator's video. It plays quietly on a loop while it is on screen; the
    speaker button turns the sound on (and silences any other video), and
    tapping the picture pauses it. Nothing autoplays for reduced motion. */
export default function CreatorVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!calm) element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(element);

    /* Another video turned its sound on: this one goes quiet. */
    const onSound = (event: Event) => {
      if ((event as CustomEvent<HTMLVideoElement>).detail !== element) {
        element.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener(SOUND_EVENT, onSound);
    return () => {
      observer.disconnect();
      window.removeEventListener(SOUND_EVENT, onSound);
    };
  }, []);

  const toggleSound = () => {
    const element = video.current;
    if (!element) return;
    const next = !element.muted;
    element.muted = next;
    setMuted(next);
    if (!next) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: element }));
      element.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  };

  return (
    <>
      <video
        ref={video}
        className="creator-video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={`Video from ${label}`}
      />
      <button
        type="button"
        className="creator-surface"
        onClick={togglePlay}
        aria-label={playing ? `Pause video from ${label}` : `Play video from ${label}`}
      >
        {playing ? null : (
          <span className="creator-play">
            <Icon path="M8 5v14l11-7z" />
          </span>
        )}
      </button>
      <button
        type="button"
        className="creator-sound"
        onClick={toggleSound}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={!muted}
      >
        {muted ? (
          <Icon path="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" />
        ) : (
          <Icon path="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
        )}
      </button>
    </>
  );
}

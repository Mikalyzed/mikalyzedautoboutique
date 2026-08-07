"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The signature carousel: centre photo full size, neighbours peeking at the
 * sides. Auto-advances every 3.8s and — per §7.2 of the build spec — any
 * interaction stops it permanently, not just until the next tick.
 */
export default function Theater({ photos, alt }: { photos: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const stopped = useRef(false);
  const [visible, setVisible] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (i: number, manual = true) => {
      if (manual) stopped.current = true;
      setCurrent(((i % photos.length) + photos.length) % photos.length);
    },
    [photos.length]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisible(!!e[0]?.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (photos.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      if (!stopped.current && visible) setCurrent((c) => (c + 1) % photos.length);
    }, 3800);
    return () => clearInterval(id);
  }, [photos.length, visible]);

  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [current, go]);

  function slotFor(i: number) {
    const rel = (i - current + photos.length) % photos.length;
    if (rel === 0) return "c";
    if (rel === 1) return "r";
    if (rel === photos.length - 1) return "l";
    return "h";
  }

  return (
    <>
      <div className="thTrack" ref={trackRef}>
        {photos.map((src, i) => {
          const slot = slotFor(i);
          return (
            <button
              key={src + i}
              className={`thSlide ${slot}`}
              aria-label={`Photo ${i + 1}`}
              aria-hidden={slot === "h"}
              tabIndex={slot === "c" ? 0 : -1}
              onClick={() => {
                if (slot === "r") go(current + 1);
                else if (slot === "l") go(current - 1);
              }}
            >
              <Image
                src={src}
                alt={slot === "c" ? alt : ""}
                fill
                sizes="880px"
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
            </button>
          );
        })}
        <button className="hnBtn thL" onClick={() => go(current - 1)} aria-label="Previous photo">
          ←
        </button>
        <button className="hnBtn thR" onClick={() => go(current + 1)} aria-label="Next photo">
          →
        </button>
      </div>

      <div className="angleDots">
        {photos.map((src, i) => (
          <button
            key={`dot${src}${i}`}
            className={`dotb${i === current ? " active" : ""}`}
            aria-label={`Photo ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <div className="strip">
        {photos.map((src, i) => (
          <button
            key={`th${src}${i}`}
            className={`thumb${i === current ? " active" : ""}`}
            aria-label={`Photo ${i + 1}`}
            onClick={() => go(i)}
          >
            <Image src={src} alt="" fill sizes="118px" style={{ objectFit: "cover" }} />
          </button>
        ))}
        <div className="stripCount">
          <b>{String(current + 1).padStart(2, "0")}</b> / {photos.length}
        </div>
      </div>
    </>
  );
}

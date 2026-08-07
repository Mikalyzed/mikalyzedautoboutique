"use client";

import { useRef } from "react";

/**
 * Scroll-snap rail with arrow controls. Aligns to the content margins rather
 * than going full-bleed — §5.3 of the build spec.
 */
export default function Rail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function go(dir: number) {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 480) + 16), behavior: "smooth" });
  }

  return (
    <>
      <div className="railNav">
        <button className="hnBtn" onClick={() => go(-1)} aria-label="Scroll left">
          ←
        </button>
        <button className="hnBtn" onClick={() => go(1)} aria-label="Scroll right">
          →
        </button>
      </div>
      <div className="rail" ref={ref}>
        {children}
      </div>
    </>
  );
}

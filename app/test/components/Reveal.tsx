"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every `.rvl` on screen — the fade-and-rise from §4 of the
 * build spec. One observer for the whole page rather than a component per
 * element, so it works on server-rendered markup without wrapping anything.
 */
export default function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".rvl"));
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.1 }
    );

    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${Math.min(i, 10) * 45}ms`;
      io.observe(n);
    });

    return () => io.disconnect();
  }, []);

  return null;
}

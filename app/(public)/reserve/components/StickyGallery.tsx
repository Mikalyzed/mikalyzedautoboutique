"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/gallery/P1900928.jpg", label: "Facility Interior" },
  { src: "/gallery/P1901037.jpg", label: "Full Bar" },
  { src: "/gallery/P1900980.jpg", label: "Racing Simulator" },
  { src: "/gallery/P1901144.jpg", label: "Full Warehouse Access" },
  { src: "/gallery/P1900950.jpg", label: "Upstairs Lounge" },
];

export default function StickyGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = wrapperHeight - viewportHeight;

      // Is the wrapper in view?
      const inView = rect.top <= 0 && rect.bottom >= viewportHeight;
      setVisible(inView);

      // How far we've scrolled into the wrapper (0 to 1)
      const scrolled = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setProgress(scrolled);

      // Map scroll progress to image index
      const index = Math.min(
        images.length - 1,
        Math.floor(scrolled * images.length)
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${images.length * 100}vh` }}
      className="relative"
    >
      {/* Fixed overlay that shows while scrolling through the wrapper */}
      <div
        className="fixed inset-0 w-full h-screen overflow-hidden transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          zIndex: 40,
        }}
      >
        {/* Images */}
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient edges for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Center content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white/40 text-xs font-light tracking-[0.5em] uppercase mb-4">
              The Facility
            </p>
            <p
              className="text-white text-2xl md:text-4xl font-extralight tracking-tight max-w-2xl mx-auto leading-relaxed transition-opacity duration-500"
              key={activeIndex}
            >
              {images[activeIndex].label}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {images.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? "rgba(223,253,110,0.9)"
                    : "rgba(255,255,255,0.2)",
                transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint — fades out as user scrolls */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: progress < 0.1 ? 1 : 0 }}
        >
          <span className="text-gray-400 text-xs font-light tracking-widest">
            SCROLL
          </span>
          <svg
            className="w-5 h-5 text-gray-400 animate-bounce-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

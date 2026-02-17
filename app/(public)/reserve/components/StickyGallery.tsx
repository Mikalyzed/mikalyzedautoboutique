"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/gallery/P1900928.jpg", label: "Facility Interior" },
  { src: "/gallery/P1901037.jpg", label: "Full Bar" },
  { src: "/gallery/P1900980.jpg", label: "Racing Simulator" },
  { src: "/gallery/P1901144.jpg", label: "Full Warehouse Access" },
  { src: "/gallery/P1900950.jpg", label: "Upstairs Lounge" },
];

export default function StickyGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <section className="relative w-full bg-black">
      {/* Image container */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <p className="text-white/40 text-xs font-light tracking-[0.5em] uppercase mb-4">
              The Facility
            </p>
            <p className="text-white text-2xl md:text-4xl font-extralight tracking-tight max-w-2xl mx-auto leading-relaxed">
              {images[activeIndex].label}
            </p>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots at the bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group p-1"
              aria-label={`Go to image ${i + 1}`}
            >
              <div
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  backgroundColor:
                    i === activeIndex
                      ? "rgba(223,253,110,0.9)"
                      : "rgba(255,255,255,0.3)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

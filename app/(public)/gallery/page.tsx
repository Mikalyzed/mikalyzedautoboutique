"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  "/gallery/P1900900.jpg",
  "/gallery/P1900928.jpg",
  "/gallery/P1900950.jpg",
  "/gallery/P1900980.jpg",
  "/gallery/P1900984.jpg",
  "/gallery/P1901037.jpg",
  "/gallery/P1901051.jpg",
  "/gallery/P1901144.jpg",
  "/gallery/P1901157.jpg",
  "/gallery/P1901200.jpg",
];

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the clicked image when the fullscreen modal opens
  useEffect(() => {
    if (isOpen && imageRefs.current[activeIndex]) {
      imageRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen, activeIndex]);

  const openFullscreen = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center scroll-reveal">
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              The Boutique
            </p>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-tight mb-6">
              Gallery
            </h1>
            <p className="text-gray-400 text-lg font-extralight max-w-xl mx-auto leading-relaxed">
              A look inside Mikalyzed Auto Boutique and The Reserve.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="relative px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, index) => (
              <div
                key={src}
                className="cursor-pointer group overflow-hidden rounded-2xl border border-zinc-800/40 hover:border-[#dffd6e]/20 transition-all duration-500"
                onClick={() => openFullscreen(index)}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN SCROLLABLE MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button
            className="fixed top-6 right-6 z-[110] w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-white hover:border-[#dffd6e] transition"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable image stack */}
          <div
            className="max-w-6xl mx-auto px-6 py-12 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((src, index) => (
              <div
                key={src}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

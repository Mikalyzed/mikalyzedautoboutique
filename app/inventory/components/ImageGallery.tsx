"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showAllThumbs, setShowAllThumbs] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to active image when modal opens
  useEffect(() => {
    if (isOpen && imageRefs.current[active]) {
      imageRefs.current[active]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen, active]);

  if (!images || images.length === 0) {
    return (
      <div className="h-[420px] bg-zinc-900 rounded-xl flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  const openFullscreen = (index: number) => {
    setActive(index);
    setIsOpen(true);
  };

  return (
    <>
      {/* MAIN IMAGE */}
      <div
        className="relative h-[240px] sm:h-[420px] w-full overflow-hidden cursor-zoom-in mb-4 bg-zinc-900"
        style={{ borderRadius: '32px' }}
        onClick={() => openFullscreen(active)}
      >
        <Image
          src={images[active]}
          alt="Vehicle image"
          fill
          priority
          className="object-cover"
        />

        {/* Click hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition">
          <span className="bg-black/70 text-white text-sm px-4 py-2 rounded-full">
            Click to expand
          </span>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-3 w-full">
        {images.map((img, index) => {
          const hiddenOnMobile = !showAllThumbs && index >= 6;
          return (
            <button
              key={index}
              onClick={() => openFullscreen(index)}
              className={`relative h-20 w-full rounded-lg overflow-hidden border-2 transition
                ${hiddenOnMobile ? "hidden sm:block" : ""}
                ${
                  index === active
                    ? "border-[#dffd6e]"
                    : "border-zinc-700 hover:border-[#dffd6e]"
                }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
      {images.length > 6 && (
        <button
          onClick={() => setShowAllThumbs(!showAllThumbs)}
          className="sm:hidden w-full mt-3 py-2 text-sm font-light text-[#dffd6e] border border-zinc-700 rounded-lg hover:border-[#dffd6e] transition"
        >
          {showAllThumbs ? "Hide photos" : `Show all ${images.length} photos`}
        </button>
      )}

      {/* FULLSCREEN MODAL */}
      {isOpen && (
  <div
    className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
    onClick={() => setIsOpen(false)}
  >
    {/* CLOSE BUTTON */}
    <button
      className="fixed top-6 right-6 z-50 text-white text-xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      ✕
    </button>

    {/* SCROLLABLE IMAGE STACK */}
    <div
      className="max-w-6xl mx-auto px-6 py-20 space-y-10"
      onClick={(e) => e.stopPropagation()}
    >
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden"
        >
          <Image
            src={img}
            alt={`Vehicle image ${index + 1}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  </div>
)}
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface RecommendedVehicle {
  vin: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  price: string;
  images: string[];
  auction?: boolean;
  auctionDate?: string;
}

export default function RecommendedSlider({ vehicles }: { vehicles: RecommendedVehicle[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth || 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  }

  function getAuctionLabel(v: RecommendedVehicle) {
    if (!v.auction) return v.price;
    if (v.auctionDate) {
      const d = Math.ceil(
        (new Date(v.auctionDate + "T00:00:00").getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (d > 1) return `Auction in ${d} days`;
      if (d === 1) return "Auction Tomorrow";
      if (d === 0) return "Auction Today";
      return "Auction Ended";
    }
    return "Learn More";
  }

  return (
    <div className="relative group/slider">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/80 border border-zinc-700 rounded-full flex items-center justify-center text-white hover:border-[#dffd6e] hover:text-[#dffd6e] transition -ml-3 sm:-ml-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/80 border border-zinc-700 rounded-full flex items-center justify-center text-white hover:border-[#dffd6e] hover:text-[#dffd6e] transition -mr-3 sm:-mr-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {vehicles.map((rec) => {
          const isAuction = !!rec.auction;
          const priceLabel = getAuctionLabel(rec);

          return (
            <Link
              key={rec.vin}
              href={`/inventory/${rec.slug}/${rec.vin}`}
              className="group flex-none w-[45%] sm:w-[30%] lg:w-[23%] snap-start bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#dffd6e] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] bg-zinc-800 overflow-hidden">
                {rec.images && rec.images.length > 0 ? (
                  <Image
                    src={rec.images[0]}
                    alt={`${rec.year} ${rec.make} ${rec.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-white text-sm font-light leading-tight truncate group-hover:text-[#dffd6e] transition">
                  {rec.year} {rec.make} {rec.model}
                </h3>
                <p className={`text-sm font-light mt-1 ${isAuction ? "text-amber-400" : "text-[#dffd6e]"}`}>
                  {priceLabel}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

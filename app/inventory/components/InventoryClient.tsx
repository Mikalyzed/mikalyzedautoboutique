"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/lib/parseInventory";
import Image from "next/image";
import Link from "next/link";

interface InventoryClientProps {
  inventory: Vehicle[];
}

export default function InventoryClient({ inventory }: InventoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Vehicles");
  const [sortOrder, setSortOrder] = useState("price-high");

  // Filter and sort logic
  const filteredInventory = useMemo(() => {
    let filtered = inventory;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((car) =>
        `${car.year} ${car.make} ${car.model}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Category filter (you can enhance this logic)
    if (activeCategory !== "All Vehicles") {
      // Add category logic here if you have category data
    }

    // Sort
    if (sortOrder === "price-high") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, "")) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, "")) || 0;
        return priceB - priceA;
      });
    } else if (sortOrder === "price-low") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, "")) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, "")) || 0;
        return priceA - priceB;
      });
    }

    return filtered;
  }, [inventory, searchTerm, activeCategory, sortOrder]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#dffd6e] text-sm font-light tracking-[0.3em] mb-4 animate-fade-in">
            DISCOVER
          </p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 animate-slide-up">
            Our Inventory
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto animate-slide-up delay-100">
            Explore our curated collection of luxury, exotic, and classic vehicles
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#dffd6e] transition"
              />
            </div>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-[#dffd6e] text-black font-normal rounded-lg px-6 py-3 focus:outline-none cursor-pointer hover:bg-[#dffd6e]/90 transition tracking-wide"
            >
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["All Vehicles", "Exotic", "Classic", "Luxury", "Trucks & SUVs"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2 rounded-lg text-sm font-normal tracking-wide transition ${
                    activeCategory === category
                      ? "bg-[#dffd6e] text-black"
                      : "bg-zinc-900 text-gray-300 hover:bg-zinc-800 font-light"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* VEHICLE COUNT */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400 text-sm font-light tracking-wide">
            Showing {filteredInventory.length} vehicle{filteredInventory.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* VEHICLE GRID */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((car, index) => (
            <Link
              key={car.vin}
              href={`/inventory/${car.slug}/${car.vin}`}
              className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#dffd6e] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Badge */}
              {car.images && car.images.length > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  {car.images.length}
                </div>
              )}

              {/* Image */}
              <div className="relative h-64 bg-zinc-800 overflow-hidden">
                {car.images && car.images.length > 0 ? (
                  <Image
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-normal tracking-tight text-white group-hover:text-[#dffd6e] transition">
                    {car.year} {car.make} {car.model}
                  </h3>
                </div>

                <p className="text-2xl font-light text-[#dffd6e] mb-4">
                  {car.price}
                </p>

                <div className="flex gap-4 text-sm text-gray-400 font-light">
                  {car.odometer && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{car.odometer.toLocaleString()} mi</span>
                    </div>
                  )}
                  {car.transmission && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>{car.transmission}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">No vehicles found matching your criteria</p>
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </>
  );
}

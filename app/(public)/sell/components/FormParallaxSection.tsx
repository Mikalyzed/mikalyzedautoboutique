"use client";

import { useEffect, useRef, useState } from "react";
import SellCarForm from "./SellCarForm";

export default function FormParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sell-form"
      className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 overflow-hidden scroll-mt-0"
    >
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#dffd6e]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-zinc-700/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#dffd6e]/3 rounded-full blur-3xl animate-pulse-slow" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left text — fade in from left on scroll */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-60px)",
            }}
          >
            <p className="text-[#dffd6e] text-sm font-light tracking-[0.4em] mb-6 uppercase">
              Get Started
            </p>
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-10 leading-tight">
              Ready to
              <br />
              <span className="bg-gradient-to-r from-[#dffd6e] to-[#dffd6e] bg-clip-text text-transparent">
                Sell?
              </span>
            </h2>
            <div className="space-y-6 text-gray-300 font-extralight text-lg leading-relaxed">
              <p>
                Tell us about your vehicle and we&apos;ll get back to you with a
                competitive offer within 24 hours. No obligation, no pressure —
                just a straightforward conversation.
              </p>
              <p className="text-gray-500">
                We buy all makes and models — luxury, exotic, classic, and
                high-performance vehicles.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                <span className="text-gray-400 text-sm font-light">
                  24-hour offers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#dffd6e]" />
                <span className="text-gray-400 text-sm font-light">
                  No obligation
                </span>
              </div>
            </div>
          </div>

          {/* Form — fade in from right on scroll */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(60px)",
              transitionDelay: "150ms",
            }}
          >
            <SellCarForm />
          </div>
        </div>
      </div>
    </section>
  );
}

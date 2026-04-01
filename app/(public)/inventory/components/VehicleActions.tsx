"use client";

import { useState, useRef, useEffect } from "react";
import ReservePanel from "./ReservePanel";
import MakeOfferPanel from "./MakeOfferPanel";

interface VehicleActionsProps {
  vehicleName: string;
  vehicleVin: string;
  vehiclePrice?: string;
  isAuction?: boolean;
  auctionUrl?: string;
  auctionHouse?: string;
}

export default function VehicleActions({ vehicleName, vehicleVin, vehiclePrice, isAuction, auctionUrl, auctionHouse }: VehicleActionsProps) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Fire view_vehicle event on page load
  useEffect(() => {
    if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as { gtag: (...args: unknown[]) => void }).gtag("event", "view_vehicle", {
        event_category: "engagement",
        event_label: vehicleName || "",
        vehicle_price: vehiclePrice || "",
        value: 0,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close contact popover on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    }
    if (contactOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [contactOpen]);

  function handleContact() {
    // Mobile: auto-call
    if (window.innerWidth < 768) {
      window.location.href = "tel:3057202533";
      return;
    }
    // Desktop: toggle popover
    setContactOpen((prev) => !prev);
  }

  return (
    <>
      <div className="flex flex-col gap-3 mb-10">
        {/* Row 1: Reserve Vehicle — full width, hidden for auction */}
        {!isAuction && (
          <button
            onClick={() => setReserveOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-black border border-[#dffd6e] text-[#dffd6e] px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base font-light tracking-wider hover:bg-[#dffd6e] hover:text-black transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Reserve Vehicle
          </button>
        )}

        {/* Row 2: Financing + Make Offer — hidden for auction */}
        {!isAuction && (
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setFinancingOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base sm:text-base font-light tracking-wide hover:border-[#dffd6e] transition"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financing
            </button>
            <button
              onClick={() => setOfferOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base font-light tracking-wider hover:border-[#dffd6e] hover:text-[#dffd6e] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Make Offer
            </button>
          </div>
        )}

        {/* Row 3: Contact Us */}
        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1 relative" ref={contactRef}>
            <button
              onClick={handleContact}
              className="w-full flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base sm:text-base font-light tracking-wide hover:border-[#dffd6e] transition"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Us
            </button>

            {/* Desktop popover */}
            {contactOpen && (
              <div className="absolute top-full left-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl p-5 z-50 shadow-2xl shadow-black/50 w-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white text-sm font-medium tracking-wide">Get In Touch</h4>
                  <button onClick={() => setContactOpen(false)} className="text-zinc-500 hover:text-white transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Phone */}
                  <a
                    href="tel:3057202533"
                    className="flex items-center gap-3 text-zinc-300 hover:text-[#dffd6e] transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#dffd6e]/10 border border-[#dffd6e]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-light">Phone</p>
                      <p className="text-sm font-light">(305) 720-2533</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@mikalyzedautoboutique.com"
                    className="flex items-center gap-3 text-zinc-300 hover:text-[#dffd6e] transition group min-w-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#dffd6e]/10 border border-[#dffd6e]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-500 font-light">Email</p>
                      <p className="text-sm font-light truncate">info@mikalyzedautoboutique.com</p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.google.com/?q=3455+NW+30th+Ave+Miami+FL+33142"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-300 hover:text-[#dffd6e] transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#dffd6e]/10 border border-[#dffd6e]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#dffd6e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-light">Address</p>
                      <p className="text-sm font-light">3455 NW 30th Ave, Miami FL 33142</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* View Auction Listing — only when auction URL is set */}
        {isAuction && auctionUrl && (
          <a
            href={auctionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#dffd6e] text-black px-6 py-3.5 sm:py-3 rounded-lg text-base font-normal tracking-wider hover:bg-[#dffd6e]/90 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View Auction Listing{auctionHouse ? ` on ${auctionHouse}` : ""}
          </a>
        )}
      </div>

      {/* Reserve slide-in panel */}
      <ReservePanel
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        vehicleName={vehicleName}
        vehicleVin={vehicleVin}
      />

      {/* Make Offer slide-in panel */}
      <MakeOfferPanel
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        vehicleName={vehicleName}
        vehicleVin={vehicleVin}
        vehiclePrice={vehiclePrice}
      />

      {/* Financing modal */}
      {financingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setFinancingOpen(false)}
          />
          <div className="relative w-full max-w-2xl mx-4 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h3 className="text-white text-lg font-light tracking-wide">Credit Application</h3>
              <button
                onClick={() => setFinancingOpen(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src="https://dwssecuredforms.dealercenter.net/CreditApplication/index/22887597?themecolor=8C8C8C&formtype=l&frameId=dws_frame_0&standalone=true"
                scrolling="auto"
                style={{ height: 1093, width: "100%" }}
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating call button — bottom right */}
      <a
        href="tel:3057202533"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#dffd6e] rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-200"
        aria-label="Call us"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </>
  );
}

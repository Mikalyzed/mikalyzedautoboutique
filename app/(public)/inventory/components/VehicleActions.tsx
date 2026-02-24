"use client";

import { useState, useRef, useEffect } from "react";
import ReservePanel from "./ReservePanel";

interface VehicleActionsProps {
  vehicleName: string;
  vehicleVin: string;
  isAuction?: boolean;
  auctionUrl?: string;
  auctionHouse?: string;
}

export default function VehicleActions({ vehicleName, vehicleVin, isAuction, auctionUrl, auctionHouse }: VehicleActionsProps) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

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
        <div className="flex gap-2 sm:gap-3">
          {/* Contact Us */}
          <div className="flex-1 relative" ref={contactRef}>
            <button
              onClick={handleContact}
              className="w-full flex items-center justify-center gap-2 bg-[#dffd6e] text-black px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base sm:text-base font-normal tracking-wide hover:bg-[#dffd6e]/90 transition"
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

          {/* Financing — hidden for auction vehicles */}
          {!isAuction && (
            <button
              onClick={() => setFinancingOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white px-4 py-3.5 sm:px-6 sm:py-3 rounded-lg text-base sm:text-base font-light tracking-wide hover:border-[#dffd6e] transition"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financing
            </button>
          )}

          {/* Share */}
          <button
            onClick={() => {
              const shareText = `Check out this ${vehicleName} at Mikalyzed Auto Boutique`;
              if (navigator.share) {
                navigator.share({ title: shareText, text: shareText, url: window.location.href });
              } else {
                navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
              }
            }}
            className="bg-black border border-zinc-700 text-white p-3.5 sm:p-3 rounded-lg hover:border-[#dffd6e] transition"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* Reserve This Vehicle — hidden for auction */}
        {!isAuction && (
          <button
            onClick={() => setReserveOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-black border border-[#dffd6e] text-[#dffd6e] px-6 py-3.5 sm:py-3 rounded-lg text-base font-light tracking-wider hover:bg-[#dffd6e] hover:text-black transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Reserve This Vehicle
          </button>
        )}

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
    </>
  );
}

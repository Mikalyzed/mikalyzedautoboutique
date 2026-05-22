"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function MetaPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.fbq) return;

    // VDPs fire ViewContent from VehicleViewContent so the content_ids
    // match the Meta catalog vehicle_id (stockNumber || vin).
    if (pathname === "/inventory") {
      window.fbq("track", "Search");
    }
  }, [pathname]);

  // Global click listener for phone and email links
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        window.fbq?.("track", "Contact");
        window.gtag?.("event", "conversion_event_contact_1");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

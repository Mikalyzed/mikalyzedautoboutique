"use client";

import { useEffect } from "react";

interface Props {
  contentId: string;
  vehicleName: string;
  price?: number;
  currency?: string;
}

// Fires Meta Pixel ViewContent for a VDP. content_ids MUST match the
// vehicle_id in the catalog feed (stockNumber, falling back to VIN) so
// Automotive Inventory Ads can retarget the specific vehicle the user viewed.
export default function VehicleViewContent({ contentId, vehicleName, price, currency = "USD" }: Props) {
  useEffect(() => {
    const fbq = (window as { fbq?: (...args: unknown[]) => void }).fbq;
    if (!fbq) return;
    fbq("track", "ViewContent", {
      content_type: "vehicle",
      content_ids: [contentId],
      content_name: vehicleName,
      ...(price ? { value: price, currency } : {}),
    });
  }, [contentId, vehicleName, price, currency]);

  return null;
}

import { getAvailableVehicles, getVehicleByVin } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/parseInventory";

export type VdpRec = { vin: string; slug: string; name: string; price: string; image: string | null };

export type VdpVehicle = {
  name: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  slug: string;
  vin: string;
  stockNumber?: string;
  odometer?: number;
  transmission?: string;
  exteriorColor?: string;
  interiorColor?: string;
  description?: string;
  images: string[];
  videoUrl?: string;
  price: string;
  isAuction: boolean;
  auctionLabel: string;
  numericPrice?: number;
  contentId: string;
};

export type VdpData = { v: VdpVehicle; recommended: VdpRec[] };

function num(s?: string) {
  return parseInt((s || "").replace(/[^0-9]/g, ""), 10) || 0;
}
function firstImage(v: Vehicle): string | null {
  const i = (v.manualImages?.length ? v.manualImages : v.images) ?? [];
  return i.length ? i[0] : null;
}

export async function getVdpData(vin?: string): Promise<VdpData | null> {
  const all = await getAvailableVehicles();
  let vehicle: Vehicle | undefined;
  if (vin) {
    const found = await getVehicleByVin(vin.toUpperCase().replace(/[^A-Z0-9]/g, ""));
    vehicle = found || undefined;
  }
  if (!vehicle) vehicle = all.find((v) => !(v as unknown as Record<string, unknown>).hidden) || all[0];
  if (!vehicle) return null;

  const rec = vehicle as unknown as Record<string, unknown>;
  const price = (rec.manualPrice as string) || vehicle.price || "Inquire";
  const description = (rec.manualDescription as string) || vehicle.description;
  const images = (vehicle.manualImages?.length ? vehicle.manualImages : vehicle.images) ?? [];
  const isAuction = !!rec.auction;

  let auctionLabel = "";
  if (isAuction) {
    if (rec.auctionDate) {
      const days = Math.ceil(
        (new Date((rec.auctionDate as string) + "T00:00:00").getTime() - Date.now()) / 86400000
      );
      auctionLabel = days > 1 ? `Auction in ${days} days` : days === 1 ? "Auction Tomorrow" : days === 0 ? "Auction Today" : "Auction Ended";
    } else {
      auctionLabel = "Learn More";
    }
  }

  const currentPrice = num(price);
  const recommended: VdpRec[] = all
    .filter((v) => v.vin !== vehicle!.vin && !(v as unknown as Record<string, unknown>).hidden)
    .map((v) => {
      const r = v as unknown as Record<string, unknown>;
      return { v, d: Math.abs(num((r.manualPrice as string) || v.price) - currentPrice) };
    })
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map(({ v }) => {
      const r = v as unknown as Record<string, unknown>;
      return {
        vin: v.vin,
        slug: v.slug,
        name: `${v.year} ${v.make} ${v.model}`,
        price: (r.manualPrice as string) || v.price || "Inquire",
        image: firstImage(v),
      };
    });

  return {
    v: {
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      slug: vehicle.slug,
      vin: vehicle.vin,
      stockNumber: vehicle.stockNumber,
      odometer: vehicle.odometer,
      transmission: vehicle.transmission,
      exteriorColor: vehicle.exteriorColor,
      interiorColor: vehicle.interiorColor,
      description,
      images,
      videoUrl: vehicle.videoUrl,
      price,
      isAuction,
      auctionLabel,
      numericPrice: num(price) || undefined,
      contentId: vehicle.stockNumber || vehicle.vin,
    },
    recommended,
  };
}

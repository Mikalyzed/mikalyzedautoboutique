import { parse } from "csv-parse/sync";

export type VehicleStatus = "available" | "sold" | "call";

export interface Vehicle {
  vin: string;
  year: number;
  make: string;
  model: string;
  slug: string;
  price: string;
  status: VehicleStatus;

  trim?: string;
  odometer?: number;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  description?: string;
  images: string[];
  videoUrl?: string;

  // Admin override fields (never set by CSV sync, only by admin panel)
  manualPrice?: string;
  manualDescription?: string;
  manualImages?: string[];
  manuallyMarkedSold?: boolean;
  featured?: boolean;
  hidden?: boolean;

  // Auction fields
  auction?: boolean;
  auctionHouse?: string;
  auctionUrl?: string;
  auctionDate?: string;
}

/**
 * Resolve a CSV column value by trying multiple possible header names.
 * DealerCenter manual downloads and automated FTP feeds use different column names.
 */
function col(row: Record<string, string>, ...names: string[]): string {
  for (const name of names) {
    const val = row[name];
    if (val !== undefined) return val;
  }
  return "";
}

export interface ParseResult {
  vehicles: Vehicle[];
  columns: string[];
}

/**
 * Parse a DealerCenter CSV string into an array of Vehicle objects.
 * Handles encoding recovery for corrupted special characters.
 * Supports multiple column name variants (manual download vs automated FTP feed).
 */
export function parseCSV(csvContent: string): Vehicle[] {
  return parseCSVWithDiagnostics(csvContent).vehicles;
}

export function parseCSVWithDiagnostics(csvContent: string): ParseResult {
  // The CSV was exported with corrupted encoding — all special chars became U+FFFD.
  // Replace with a safe placeholder before CSV parsing (to avoid breaking CSV quoting),
  // then do context-aware recovery on parsed field values.
  const PLACEHOLDER = "\uE000";
  const fileContent = csvContent.replace(/\uFFFD/g, PLACEHOLDER);

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

  const columns = records.length > 0 ? Object.keys(records[0]) : [];

  // Recover original characters from placeholder using surrounding context
  function fixEncoding(text: string): string {
    return text.replace(new RegExp(PLACEHOLDER, "g"), (_, offset) => {
      const before = text.slice(Math.max(0, offset - 2), offset);
      const after = text.slice(offset + 1, offset + 3);
      // " _ " (space-surrounded) → em dash
      if (before.endsWith(" ") && after.startsWith(" ")) return "—";
      // 10_, 24_, 33_ → inch mark (double prime)
      if (/\d$/.test(before) && /[ \s",.)]/.test(after[0] || "")) return "\u2033";
      // word_s, word_re, word_d, word_t, word_ll, word_ve, word_m → apostrophe
      if (/[a-zA-Z]$/.test(before)) return "\u2019";
      // _90s, _70s → apostrophe
      if (/\d/.test(after[0] || "")) return "\u2019";
      return "\u2019";
    })
    // Clean up stray spaces before commas/periods left by encoding artifacts
    .replace(/ +,/g, ",")
    .replace(/ +\./g, ".");
  }

  const vehicles = records
    .map((row) => {
      const vin = col(row, "VIN", "Vin", "vin")?.trim().toUpperCase();
      if (!vin) return null;

      const year = Number(col(row, "Year", "year", "ModelYear", "Model Year"));
      const make = col(row, "Make", "make")?.trim();
      const model = col(row, "Model", "model")?.trim();

      // DealerCenter uses "Price" in manual downloads, "SpecialPrice" in automated FTP feeds
      const rawPrice = col(row,
        "SpecialPrice", "Price", "InternetPrice", "Internet Price",
        "SellingPrice", "Selling Price",
        "RetailPrice", "Retail Price",
        "AskingPrice", "Asking Price",
        "ListPrice", "List Price",
        "price"
      )?.trim();

      let status: VehicleStatus = "available";
      let price = "Call for Price";

      if (rawPrice && rawPrice !== "0") {
        price = `$${Number(rawPrice).toLocaleString()}`;
      } else {
        status = "call";
      }

      const statusVal = col(row, "Status", "status", "VehicleStatus")?.toLowerCase();
      if (statusVal === "sold") {
        status = "sold";
        price = "Sold";
      }

      const slug = `${year}-${make}-${model}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // DealerCenter uses "WebDescription" in manual downloads, "WebAdDescription" in automated FTP feeds
      const rawDescription = col(row,
        "WebAdDescription", "WebDescription", "Description", "Comments",
        "VehicleDescription", "Vehicle Description",
        "DetailDescription", "Detail Description",
        "description"
      )?.trim();

      // DealerCenter photo URLs — may be "PhotoUrl", "PhotoUrls", "ImageUrl", "Photos", etc.
      const rawPhotos = col(row,
        "PhotoUrl", "PhotoURL", "PhotoUrls", "PhotoURLs",
        "ImageUrl", "ImageURL", "ImageUrls", "ImageURLs",
        "Photos", "Images",
        "photoUrl", "photourl"
      );

      // DealerCenter video URLs — may be "VideoUrl", "VideoURL", "TurnTableVideoUrl", etc.
      const rawVideo = col(row,
        "VideoUrl", "VideoURL", "Video URL",
        "TurnTableVideoUrl", "TurnTableVideoURL", "TurntableVideoUrl",
        "SpinCarUrl", "SpinCarURL",
        "videoUrl", "videourl"
      )?.trim();

      return {
        vin,
        year,
        make,
        model,
        slug,
        price,
        status,
        trim: col(row, "Trim", "trim")?.trim() || undefined,
        odometer: col(row, "Odometer", "Mileage", "Miles", "odometer", "mileage")
          ? Number(col(row, "Odometer", "Mileage", "Miles", "odometer", "mileage").replace(/[^0-9]/g, ""))
          : undefined,
        exteriorColor: col(row, "ExteriorColor", "Exterior Color", "ExtColor", "exteriorColor")?.trim() || undefined,
        interiorColor: col(row, "InteriorColor", "Interior Color", "IntColor", "interiorColor")?.trim() || undefined,
        transmission: col(row, "Transmission", "transmission", "Trans")?.trim() || undefined,
        description: rawDescription ? fixEncoding(rawDescription) : undefined,
        images: rawPhotos
          ? rawPhotos.split(",").map((url: string) =>
              url.trim().replace(
                /imagesdl\.dealercenter\.net\/\d+\/\d+\//,
                "imagesdl.dealercenter.net/1920/1440/"
              )
            ).filter(Boolean)
          : [],
        videoUrl: rawVideo || undefined,
      };
    })
    .filter(Boolean) as Vehicle[];

  return { vehicles, columns };
}

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
 * Parse a DealerCenter CSV string into an array of Vehicle objects.
 * Handles encoding recovery for corrupted special characters.
 */
export function parseCSV(csvContent: string): Vehicle[] {
  // The CSV was exported with corrupted encoding — all special chars became U+FFFD.
  // Replace with a safe placeholder before CSV parsing (to avoid breaking CSV quoting),
  // then do context-aware recovery on parsed field values.
  const PLACEHOLDER = "\uE000";
  const fileContent = csvContent.replace(/\uFFFD/g, PLACEHOLDER);

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

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

  return records
    .map((row) => {
      const vin = row["VIN"]?.trim().toUpperCase();
      if (!vin) return null;

      const year = Number(row["Year"]);
      const make = row["Make"]?.trim();
      const model = row["Model"]?.trim();

      const rawPrice = row["Price"]?.trim();

      let status: VehicleStatus = "available";
      let price = "Call for Price";

      if (rawPrice && rawPrice !== "0") {
        price = `$${Number(rawPrice).toLocaleString()}`;
      } else {
        status = "call";
      }

      if (row["Status"]?.toLowerCase() === "sold") {
        status = "sold";
        price = "Sold";
      }

      const slug = `${year}-${make}-${model}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        vin,
        year,
        make,
        model,
        slug,
        price,
        status,
        trim: row["Trim"]?.trim() || undefined,
        odometer: row["Odometer"] ? Number(row["Odometer"].replace(/[^0-9]/g, "")) : undefined,
        exteriorColor: row["ExteriorColor"]?.trim() || undefined,
        interiorColor: row["InteriorColor"]?.trim() || undefined,
        transmission: row["Transmission"]?.trim() || undefined,
        description: row["WebDescription"]?.trim() ? fixEncoding(row["WebDescription"].trim()) : undefined,
        images: row["PhotoUrl"]
          ? row["PhotoUrl"].split(",").map((url: string) =>
              url.trim().replace(
                /imagesdl\.dealercenter\.net\/\d+\/\d+\//,
                "imagesdl.dealercenter.net/1920/1440/"
              )
            ).filter(Boolean)
          : [],
        videoUrl: (row["VideoUrl"] || row["VideoURL"])?.trim() || undefined,
      };
    })
    .filter(Boolean) as Vehicle[];
}

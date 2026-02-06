import fs from "fs";
import path from "path";
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
  odometer?: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  description?: string;
  images: string[];
}

export function getInventoryFromCSV(): Vehicle[] {
  const filePath = path.join(
    process.cwd(),
    "data",
    "DealerCenter_20260204_22887597.csv"
  );

  const fileContent = fs.readFileSync(filePath);

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

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
        description: row["WebDescription"]?.trim() || undefined,
        images: row["PhotoUrl"] ? row["PhotoUrl"] .split(",") .map((url: string) => url.trim())
        .filter(Boolean)
            : [],
        };
    })
    .filter(Boolean) as Vehicle[];
}
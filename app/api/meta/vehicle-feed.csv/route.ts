import { getAvailableVehicles } from "@/lib/vehicles";
import type { DynamoVehicle } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

const BASE_URL = "https://mikalyzedautoboutique.com";
const ADDR1 = "3455 NW 30th Ave";
const CITY = "Miami";
const COUNTRY = "United States";
const REGION = "Florida";
const POSTAL_CODE = "33142";
const NEIGHBORHOOD = "Allapattah";
const LATITUDE = "25.8030";
const LONGITUDE = "-80.2421";
const MAX_IMAGES = 10;

// Column order is locked to a Meta-accepted format proven to ingest cleanly.
// Each image slot is split into a URL column and a tag column.
const HEADERS = [
  "vehicle_id",
  "title",
  "description",
  "price",
  ...Array.from({ length: MAX_IMAGES }, (_, i) => [
    `image[${i}].url`,
    `image[${i}].tag[0]`,
  ]).flat(),
  "url",
  "body_style",
  "address.addr1",
  "address.city",
  "address.country",
  "latitude",
  "longitude",
  "neighborhood[0]",
  "make",
  "model",
  "year",
  "state_of_vehicle",
  "mileage.unit",
  "mileage.value",
  "availability",
  "condition",
  "transmission",
  "fuel_type",
  "address.region",
  "address.postal_code",
  "exterior_color",
  "interior_color",
];

function csvEscape(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Meta accepts: AUTOMATIC, MANUAL, OTHER
function normalizeTransmission(t: string | undefined): string {
  if (!t) return "OTHER";
  const lower = t.toLowerCase();
  if (lower.includes("auto")) return "AUTOMATIC";
  if (lower.includes("manual") || lower.includes("stick")) return "MANUAL";
  return "OTHER";
}

// Best-effort body style from model name. Defaults to COUPE — most of our
// inventory is classic/exotic coupes. Meta accepts the uppercase enum.
function inferBodyStyle(model: string | undefined): string {
  if (!model) return "COUPE";
  const m = model.toLowerCase();
  if (/(convertible|cabriolet|roadster|spider|spyder)/.test(m)) return "CONVERTIBLE";
  if (/(suv|escalade|tahoe|suburban|navigator|wrangler|range rover|cayenne|urus)/.test(m)) return "SUV";
  if (/(truck|silverado|f-150|f150|ram|sierra|tacoma|tundra|pickup)/.test(m)) return "TRUCK";
  if (/(van|sprinter)/.test(m)) return "VAN";
  if (/(wagon|estate)/.test(m)) return "WAGON";
  if (/(hatchback|hatch)/.test(m)) return "HATCHBACK";
  if (/(sedan|s-class|7 series|a8)/.test(m)) return "SEDAN";
  return "COUPE";
}

function buildRow(v: DynamoVehicle): string {
  const trimRaw = v.trim?.trim();
  const trim = trimRaw && trimRaw.length >= 2 && /[A-Za-z]/.test(trimRaw) ? trimRaw : undefined;
  const title = `${v.year} ${v.make} ${v.model}${trim ? ` ${trim}` : ""}`;
  const url = `${BASE_URL}/inventory/${v.slug}/${v.vin}`;

  const images = (v.manualImages?.length ? v.manualImages : v.images || []).slice(0, MAX_IMAGES);
  const imageCells: (string)[] = [];
  for (let i = 0; i < MAX_IMAGES; i++) {
    imageCells.push(images[i] || "", images[i] ? "Exterior" : "");
  }

  const description =
    v.manualDescription || v.description || `${title} available at Mikalyzed Auto Boutique`;

  const displayPrice = v.manualPrice || v.price;
  const numericPrice = displayPrice?.replace(/[^0-9.]/g, "") || "";
  const hasPrice = numericPrice && displayPrice !== "Call for Price" && displayPrice !== "Sold";
  const priceCell = hasPrice ? `${Number(numericPrice).toFixed(2)} USD` : "";

  const availability = v.status === "sold" ? "SOLD" : "AVAILABLE";
  const mileage = v.odometer && v.odometer > 0 ? v.odometer : 1;
  const vehicleId = v.stockNumber || v.vin;

  const row = [
    vehicleId,
    title,
    description,
    priceCell,
    ...imageCells,
    url,
    inferBodyStyle(v.model),
    ADDR1,
    CITY,
    COUNTRY,
    LATITUDE,
    LONGITUDE,
    NEIGHBORHOOD,
    v.make,
    v.model,
    v.year,
    "USED",
    "MI",
    mileage,
    availability,
    "GOOD",
    normalizeTransmission(v.transmission),
    "GASOLINE",
    REGION,
    POSTAL_CODE,
    v.exteriorColor || "Other",
    v.interiorColor || "",
  ];

  return row.map(csvEscape).join(",");
}

export async function GET() {
  const vehicles = (await getAvailableVehicles()) as DynamoVehicle[];

  const eligible = vehicles.filter(
    (v) => !v.hidden && !v.auction && !v.manuallyMarkedSold && v.status !== "sold"
  );

  const rows = eligible
    .filter((v) => v.vin && v.year && v.make && v.model && (v.images?.length || v.manualImages?.length))
    .map(buildRow);

  const csv = [HEADERS.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}

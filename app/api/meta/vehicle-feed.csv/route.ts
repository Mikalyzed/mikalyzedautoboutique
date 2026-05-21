import { getAvailableVehicles } from "@/lib/vehicles";
import type { DynamoVehicle } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

const BASE_URL = "https://mikalyzedautoboutique.com";
const DEALER_ID = "mikalyzed-miami";
const DEALER_NAME = "Mikalyzed Auto Boutique";
const ADDRESS = "3455 NW 30th Ave";
const CITY = "Miami";
const REGION = "FL";
const POSTAL_CODE = "33142";
const COUNTRY = "US";
const MAX_IMAGES = 10;

const HEADERS = [
  "vehicle_id",
  "title",
  "description",
  "url",
  "make",
  "model",
  "year",
  "trim",
  "mileage.value",
  "mileage.unit",
  ...Array.from({ length: MAX_IMAGES }, (_, i) => `image[${i}].url`),
  "body_style",
  "fuel_type",
  "transmission",
  "exterior_color",
  "interior_color",
  "price",
  "state_of_vehicle",
  "condition",
  "vin",
  "dealer_id",
  "dealer_name",
  "address",
  "city",
  "region",
  "postal_code",
  "country",
  "availability",
];

function csvEscape(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Meta accepts: automatic, manual, other
function normalizeTransmission(t: string | undefined): string {
  if (!t) return "other";
  const lower = t.toLowerCase();
  if (lower.includes("auto")) return "automatic";
  if (lower.includes("manual") || lower.includes("stick")) return "manual";
  return "other";
}

// Best-effort body style from model name. Defaults to "Coupe" — most of our
// inventory is classic/exotic coupes, and Meta requires this field.
function inferBodyStyle(model: string | undefined): string {
  if (!model) return "Coupe";
  const m = model.toLowerCase();
  if (/(convertible|cabriolet|roadster|spider|spyder)/.test(m)) return "Convertible";
  if (/(suv|escalade|tahoe|suburban|navigator|wrangler|range rover|cayenne|urus)/.test(m)) return "SUV";
  if (/(truck|silverado|f-150|f150|ram|sierra|tacoma|tundra)/.test(m)) return "Truck";
  if (/(van|sprinter)/.test(m)) return "Van";
  if (/(wagon|estate)/.test(m)) return "Wagon";
  if (/(hatchback|hatch)/.test(m)) return "Hatchback";
  if (/(sedan|s-class|7 series|a8)/.test(m)) return "Sedan";
  return "Coupe";
}

function buildRow(v: DynamoVehicle): string {
  const title = `${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ""}`;
  const url = `${BASE_URL}/inventory/${v.slug}/${v.vin}`;

  const images = (v.manualImages?.length ? v.manualImages : v.images || []).slice(0, MAX_IMAGES);
  const imageCells = Array.from({ length: MAX_IMAGES }, (_, i) => images[i] || "");

  const description =
    v.manualDescription || v.description || `${title} available at ${DEALER_NAME}`;

  const displayPrice = v.manualPrice || v.price;
  const numericPrice = displayPrice?.replace(/[^0-9.]/g, "") || "";
  const hasPrice = numericPrice && displayPrice !== "Call for Price" && displayPrice !== "Sold";
  const priceCell = hasPrice ? `${numericPrice} USD` : "";

  const availability = v.status === "sold" ? "sold" : "available";

  const row = [
    v.vin,
    title,
    description,
    url,
    v.make,
    v.model,
    v.year,
    v.trim || "",
    v.odometer ?? 0,
    "MI",
    ...imageCells,
    inferBodyStyle(v.model),
    "gasoline",
    normalizeTransmission(v.transmission),
    v.exteriorColor || "",
    v.interiorColor || "",
    priceCell,
    "used",
    "good",
    v.vin,
    DEALER_ID,
    DEALER_NAME,
    ADDRESS,
    CITY,
    REGION,
    POSTAL_CODE,
    COUNTRY,
    availability,
  ];

  return row.map(csvEscape).join(",");
}

export async function GET() {
  const vehicles = (await getAvailableVehicles()) as DynamoVehicle[];

  // Exclude hidden, auction-only, and manually-marked-sold vehicles. Once a
  // vehicle drops out of the feed, Meta will stop serving its ads on the
  // next scheduled pull.
  const eligible = vehicles.filter(
    (v) => !v.hidden && !v.auction && !v.manuallyMarkedSold && v.status !== "sold"
  );

  // Skip vehicles missing the basics Meta will reject the row for
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

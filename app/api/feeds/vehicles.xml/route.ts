import { getAvailableVehicles } from "@/lib/vehicles";
import type { DynamoVehicle } from "@/lib/vehicles";

export const dynamic = "force-dynamic";

const BASE_URL = "https://mikalyzedautoboutique.com";
const STORE_CODE = "mikalyzed-miami";
const DEALERSHIP_NAME = "Mikalyzed Auto Boutique";
const DEALERSHIP_ADDRESS = "3455 NW 30th Ave, Miami, FL 33142, US";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildItem(v: DynamoVehicle): string {
  const title = `${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ""}`;
  const link = `${BASE_URL}/inventory/${v.slug}/${v.vin}`;
  const image = v.manualImages?.[0] || v.images?.[0] || "";
  const additionalImages = (v.manualImages?.length ? v.manualImages : v.images || []).slice(1, 11);

  // Parse numeric price from formatted string like "$79,900"
  const numericPrice = v.price?.replace(/[^0-9]/g, "") || "";
  const hasPrice = numericPrice && v.price !== "Call for Price" && v.price !== "Sold";

  const description =
    v.manualDescription || v.description || `${title} available at ${DEALERSHIP_NAME}`;

  const lines: string[] = [
    "    <item>",
    `      <g:id>${escapeXml(v.vin)}</g:id>`,
    `      <g:vin>${escapeXml(v.vin)}</g:vin>`,
    `      <title>${escapeXml(title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <description>${escapeXml(description)}</description>`,
  ];

  if (image) {
    lines.push(`      <g:image_link>${escapeXml(image)}</g:image_link>`);
  }
  for (const img of additionalImages) {
    lines.push(`      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`);
  }

  if (hasPrice) {
    lines.push(`      <g:price>${numericPrice} USD</g:price>`);
  }

  lines.push(`      <g:availability>in_stock</g:availability>`);
  lines.push(`      <g:condition>used</g:condition>`);
  lines.push(`      <g:make>${escapeXml(v.make)}</g:make>`);
  lines.push(`      <g:model>${escapeXml(v.model)}</g:model>`);
  lines.push(`      <g:year>${v.year}</g:year>`);

  if (v.trim) {
    lines.push(`      <g:trim>${escapeXml(v.trim)}</g:trim>`);
  }
  if (v.odometer !== undefined) {
    lines.push(`      <g:mileage>${v.odometer} mi</g:mileage>`);
  }
  if (v.exteriorColor) {
    lines.push(`      <g:exterior_color>${escapeXml(v.exteriorColor)}</g:exterior_color>`);
  }
  if (v.interiorColor) {
    lines.push(`      <g:interior_color>${escapeXml(v.interiorColor)}</g:interior_color>`);
  }
  if (v.transmission) {
    lines.push(`      <g:transmission>${escapeXml(v.transmission)}</g:transmission>`);
  }

  lines.push(`      <g:vehicle_fulfillment>in_store:${STORE_CODE}</g:vehicle_fulfillment>`);
  lines.push(`      <g:store_code>${escapeXml(STORE_CODE)}</g:store_code>`);
  lines.push(`      <g:dealership_name>${escapeXml(DEALERSHIP_NAME)}</g:dealership_name>`);
  lines.push(`      <g:dealership_address>${escapeXml(DEALERSHIP_ADDRESS)}</g:dealership_address>`);

  lines.push("    </item>");
  return lines.join("\n");
}

export async function GET() {
  const vehicles = (await getAvailableVehicles()) as DynamoVehicle[];
  // Active inventory only: exclude hidden, auction, and manually-marked-sold vehicles
  const visibleVehicles = vehicles.filter(
    (v) => !v.hidden && !v.auction && !v.manuallyMarkedSold && v.status !== "sold"
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Mikalyzed Auto Boutique - Vehicle Inventory</title>
    <link>${BASE_URL}</link>
    <description>Premium pre-owned luxury and exotic vehicles</description>
${visibleVehicles.map(buildItem).join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

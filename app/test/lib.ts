import type { Vehicle } from "@/lib/parseInventory";

/**
 * Display helpers for the preview pages.
 *
 * Admin overrides win over synced values everywhere on the live site, so the
 * preview has to honour them too or a car with a hand-written price/description
 * would render differently here than in production.
 */

export function displayPrice(v: Vehicle): string {
  return v.manualPrice || v.price;
}

export function displayImages(v: Vehicle): string[] {
  return v.manualImages?.length ? v.manualImages : v.images || [];
}

export function displayDescription(v: Vehicle): string {
  return v.manualDescription || v.description || "";
}

export function vehicleName(v: Vehicle): string {
  return `${v.make} ${v.model}`.trim();
}

/** "$399,100" stays as-is; "Call" / "Inquire" pass through untouched. */
export function priceLabel(v: Vehicle): string {
  const p = displayPrice(v);
  return p && /\d/.test(p) ? p : p || "Inquire";
}

export function miles(v: Vehicle): string {
  return v.odometer == null ? "— MI" : `${v.odometer.toLocaleString("en-US")} MI`;
}

/** Numeric price for sorting and for Meta/GA value params. */
export function priceNumber(v: Vehicle): number | null {
  const digits = (displayPrice(v) || "").replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : null;
}

export function vdpHref(v: Vehicle): string {
  return `/test/vdp/${v.vin}`;
}

/**
 * Split a listing description into the three Breakdown slots — mechanical,
 * exterior, interior. The DMS copy is written as prose, so this looks for the
 * paragraph that talks about each area rather than assuming a fixed order.
 * Falls back to splitting evenly so the section never renders empty.
 */
export function breakdownSections(description: string): {
  engine: string;
  exterior: string;
  interior: string;
} {
  const paras = description
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paras.length < 2) {
    return { engine: description, exterior: "", interior: "" };
  }

  const pick = (words: RegExp) => paras.find((p) => words.test(p)) || "";

  const engine = pick(/engine|v8|v6|horsepower|hp\b|torque|transmission|drivetrain|motor/i);
  const exterior = pick(/exterior|paint|wheel|tire|body|widebody|finish|stance/i);
  const interior = pick(/interior|leather|cabin|seat|dash|upholster/i);

  // Anything unmatched falls back to the next unused paragraph in order.
  const used = new Set([engine, exterior, interior].filter(Boolean));
  const spare = paras.filter((p) => !used.has(p));

  return {
    engine: engine || spare.shift() || "",
    exterior: exterior || spare.shift() || "",
    interior: interior || spare.shift() || "",
  };
}

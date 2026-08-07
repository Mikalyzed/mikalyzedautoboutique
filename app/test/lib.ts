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
/**
 * Listings arrive with a headline run straight into the body and no space —
 * "…Slant Nose Aluminum ConversionThis 1983 Porsche…". Break at the
 * lowercase-to-uppercase seam so the first sentence isn't a mangled join.
 */
function normalizeCopy(description: string): string {
  return description.replace(/([a-z,)])([A-Z])/g, "$1. $2");
}

export function paragraphsOf(description: string): string[] {
  // DMS copy separates paragraphs with a SINGLE newline — the live VDP renders
  // it in one <p> with `whitespace-pre-line`. Splitting on blank lines (\n{2,})
  // found nothing and collapsed the whole listing into a single block.
  return description
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function sentencesOf(text: string): string[] {
  return normalizeCopy(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
}

export function breakdownSections(description: string): {
  engine: string;
  exterior: string;
  interior: string;
} {
  const paras = paragraphsOf(description);
  if (paras.length === 0) return { engine: "", exterior: "", interior: "" };

  // Plenty of listings are one unbroken block — the 1983 911 SC is 1,443
  // characters with no newline anywhere. Paragraph splitting has nothing to
  // work with there, so drop to sentences and group those instead. Without
  // this the whole listing landed in Engine and the other two rows vanished.
  const units = paras.length >= 3 ? paras : sentencesOf(description);
  if (units.length < 2) return { engine: units[0] ?? paras[0], exterior: "", interior: "" };

  // Listing copy mixes topics freely — an opening paragraph often names the
  // paint AND the leather. Matching each topic independently handed the same
  // paragraph to two sections, so the page showed it twice. Score every
  // paragraph per topic instead and claim exclusively: strongest match wins,
  // and a claimed paragraph is out of the running for the others.
  const TOPIC_WORDS: Record<Topic, RegExp> = {
    engine: /engine|\bv8\b|\bv6\b|\bv10\b|\bv12\b|horsepower|\bhp\b|torque|transmission|drivetrain|motor|turbo|supercharg|clutch|gearbox|exhaust/gi,
    exterior: /exterior|paint|wheel|tire|widebody|body kit|stance|chrome|\bfinish(?:ed)?\b|stripe|bumper/gi,
    interior: /interior|leather|cabin|seat|dashboard|upholster|console|steering wheel/gi,
  };

  const score = (p: string, re: RegExp) => (p.match(re) ?? []).length;

  // Every unit goes to its best-scoring topic, rather than each topic taking
  // exactly one unit. Copy doesn't divide neatly into three — a listing may
  // spend three sentences on the engine and one on the cabin — and one-each
  // left most of the text on the floor.
  const buckets: Record<Topic, string[]> = { engine: [], exterior: [], interior: [] };
  const orphans: string[] = [];

  for (const unit of units) {
    let bestTopic: Topic | null = null;
    let bestScore = 0;
    for (const topic of ["engine", "exterior", "interior"] as Topic[]) {
      const s = score(unit, TOPIC_WORDS[topic]);
      if (s > bestScore) {
        bestScore = s;
        bestTopic = topic;
      }
    }
    if (bestTopic) buckets[bestTopic].push(unit);
    else orphans.push(unit);
  }

  // Unsignalled text goes wherever there's least, which keeps the three rows
  // roughly even in height — the point of splitting them in the first place.
  for (const unit of orphans) {
    const thinnest = (["engine", "exterior", "interior"] as Topic[]).sort(
      (a, b) => buckets[a].join(" ").length - buckets[b].join(" ").length
    )[0];
    buckets[thinnest].push(unit);
  }

  return {
    engine: buckets.engine.join(" "),
    exterior: buckets.exterior.join(" "),
    interior: buckets.interior.join(" "),
  };
}

type Topic = "engine" | "exterior" | "interior";

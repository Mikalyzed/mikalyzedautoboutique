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
export function paragraphsOf(description: string): string[] {
  // DMS copy separates paragraphs with a SINGLE newline — the live VDP renders
  // it in one <p> with `whitespace-pre-line`. Splitting on blank lines (\n{2,})
  // found nothing and collapsed the whole listing into a single block.
  return description
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function breakdownSections(description: string): {
  engine: string;
  exterior: string;
  interior: string;
} {
  const paras = paragraphsOf(description);

  if (paras.length === 0) return { engine: "", exterior: "", interior: "" };
  if (paras.length < 2) {
    return { engine: paras[0], exterior: "", interior: "" };
  }

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

  const claimed = new Set<number>();
  const out: Record<Topic, string> = { engine: "", exterior: "", interior: "" };

  for (const topic of ["engine", "exterior", "interior"] as Topic[]) {
    let bestIdx = -1;
    let bestScore = 0;
    paras.forEach((p, i) => {
      if (claimed.has(i)) return;
      const s = score(p, TOPIC_WORDS[topic]);
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    });
    if (bestIdx >= 0) {
      claimed.add(bestIdx);
      out[topic] = paras[bestIdx];
    }
  }

  // Topics that matched nothing take the next unclaimed paragraph in order.
  const spare = paras.filter((_, i) => !claimed.has(i));
  for (const topic of ["engine", "exterior", "interior"] as Topic[]) {
    if (!out[topic]) out[topic] = spare.shift() ?? "";
  }

  return out;
}

type Topic = "engine" | "exterior" | "interior";

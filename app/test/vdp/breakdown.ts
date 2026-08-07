import type { Vehicle } from "@/lib/parseInventory";
import { breakdownSections, displayDescription, displayImages, paragraphsOf } from "../lib";
import { CURATED } from "./curated";
import { VERIFIED_PHOTOS } from "./verified-photos";

/**
 * The Breakdown — three balanced editorial rows, per spec §7.4.
 *
 * Rows are built by splitting the listing copy into mechanical / bodywork /
 * cabin and giving each its own paragraph, headline, topic photo and
 * sub-elements. Never one description with a photo beside it.
 *
 * Two sources feed a row, in order:
 *   1. A curated entry keyed by VIN — art-directed headline, topic photos and
 *      chips for cars someone has actually gone through. The mockup was built
 *      on the SLS as the reference vehicle, so that's what's seeded.
 *   2. Derivation from the listing text — works for every other car.
 *
 * Nothing is invented either way: curated values are transcribed from that
 * car's own listing, and derived values are pulled out of its description.
 */

export type Stat = { n: string; unit?: string; l: string };
export type Chip = { label: string; ok?: boolean };

export type BreakdownRow = {
  n: string;
  topic: string;
  title: string;
  body: string;
  img?: string;
  objectPosition?: string;
  stats?: Stat[];
  chips?: Chip[];
};

export type Breakdown = {
  rows: BreakdownRow[];
  heritage?: string;
  /** Sentence-level lede above the rows. */
  pull?: string;
};

const TOPICS = [
  { key: "engine", topic: "Engine" },
  { key: "exterior", topic: "Exterior" },
  { key: "interior", topic: "Interior" },
] as const;

/**
 * Pick a topic photo without any classification to go on.
 *
 * Nothing in the feed labels an engine bay, so this leans on how DealerCenter
 * sets are ordered in practice: exteriors first, then cabin, then engine and
 * detail shots at the end. Taking adjacent indexes (photos[i+1]) ignored that
 * entirely and pulled arbitrary crops — a detail shot landing in the Exterior
 * row is exactly the fill-rule violation the spec warns about.
 *
 * It's a heuristic, not knowledge. Curated cars override it outright.
 */
function topicPhoto(photos: string[], key: "engine" | "exterior" | "interior"): string | undefined {
  if (photos.length === 0) return undefined;
  if (photos.length < 4) return photos[0];

  const at = (fraction: number) =>
    photos[Math.min(photos.length - 1, Math.max(0, Math.round((photos.length - 1) * fraction)))];

  // Exterior takes the second frame — the first is usually the same hero shot
  // already dominating the carousel above.
  if (key === "exterior") return photos[1];
  if (key === "interior") return at(0.6);

  // Engine sits late but before the interior tail. On the 1983 911 SC the bay
  // is frame 22 of 28 (~0.81) while 23 is the CLOSED deck lid — which is how
  // an "Engine" row ended up showing a shut engine cover. Nudged to 0.8, but
  // a fraction cannot actually recognise an engine: adjacent frames differ by
  // open vs closed, and only curation or a classification pass fixes that
  // properly.
  return at(0.8);
}

/** Vocabulary we'll surface as a chip, but only when the listing says it. */
const CHIP_VOCAB: Record<string, RegExp> = {
  Widebody: /widebody/i,
  "ANRKY wheels": /anrky/i,
  "Pirelli P Zero": /pirelli\s+p\s*zero/i,
  "Factory finishes": /factory finishes/i,
  "Naturally aspirated": /naturally[- ]aspirated/i,
  "Rear-wheel drive": /rear[- ]wheel drive|\brwd\b/i,
  "Rear transaxle": /rear transaxle/i,
  Supercharged: /supercharg/i,
  "Turbocharged": /turbocharg/i,
};

function firstSentence(p: string): string {
  const m = p.match(/^(.{20,110}?[.!?])(\s|$)/);
  return (m ? m[1] : p.slice(0, 90)).replace(/\.$/, "");
}

/** hp / lb-ft / drive layout, read out of the copy rather than assumed. */
function statsFromCopy(text: string): Stat[] {
  const stats: Stat[] = [];

  const hp = text.match(/([\d,]{2,6})\s*(?:horsepower|hp\b)/i);
  if (hp) stats.push({ n: hp[1].replace(/,/g, ""), unit: "hp", l: "Factory rated" });

  const tq = text.match(/([\d,]{2,6})\s*lb-?\s?ft/i);
  if (tq) stats.push({ n: tq[1].replace(/,/g, ""), unit: "lb-ft", l: "Torque" });

  if (/rear transaxle/i.test(text)) stats.push({ n: "RWD", l: "Rear transaxle" });
  else if (/rear[- ]wheel drive|\brwd\b/i.test(text)) stats.push({ n: "RWD", l: "Drivetrain" });
  else if (/all[- ]wheel drive|\bawd\b|4matic|quattro/i.test(text)) stats.push({ n: "AWD", l: "Drivetrain" });
  else if (/front[- ]wheel drive|\bfwd\b/i.test(text)) stats.push({ n: "FWD", l: "Drivetrain" });

  return stats;
}

function chipsFromCopy(text: string, extra: Chip[] = []): Chip[] {
  const chips: Chip[] = [...extra];
  for (const [label, re] of Object.entries(CHIP_VOCAB)) {
    if (re.test(text) && !chips.some((c) => c.label === label)) chips.push({ label });
  }
  // Gearbox described in prose beats the feed's coarse "Automatic".
  const gearbox = text.match(/(\d)\s*-?\s*speed\s+(dual[- ]clutch|manual|automatic|dct|pdk)/i);
  if (gearbox) chips.unshift({ label: `${gearbox[1]}-speed ${gearbox[2].toLowerCase()}` });
  if (/stock (?:drivetrain|engine)|unmodified|fully stock|remains stock/i.test(text)) {
    chips.unshift({ label: "✓ Fully stock", ok: true });
  }
  return chips.slice(0, 4);
}

/**
 * Pull the heritage/provenance sentence out so it can head the plaque instead
 * of padding a paragraph. Returns the sentence and the copy with it removed.
 */
function extractHeritage(paras: string[]): { heritage?: string; rest: string[] } {
  // Deliberately narrow. An earlier pass matched "iconic" and "heritage" and
  // duly plaqued "…a clean, well-presented example of one of AMG's most iconic
  // modern cars" — marketing filler, not provenance. These phrases only turn up
  // when the copy is genuinely talking about the car's lineage.
  const STRONG =
    /(first car|developed in-house|inspired by|descendant of|direct descendant|marked a significant moment|gullwing|\b\d{3}\s?SL\b|racing heritage|homologat|debut(?:ed)? at|won .{0,20}\b(?:le mans|targa|mille miglia)\b)/gi;

  let best: { p: number; s: number; text: string; score: number } | null = null;

  paras.forEach((para, p) => {
    para.split(/(?<=[.!?])\s+/).forEach((sentence, s) => {
      const score = (sentence.match(STRONG) ?? []).length;
      if (score === 0) return;
      // Ties go to the later sentence — provenance tends to close the listing.
      if (!best || score > best.score || (score === best.score && p >= best.p)) {
        best = { p, s, text: sentence.trim(), score };
      }
    });
  });

  if (!best) return { rest: paras };
  const hit = best as { p: number; s: number; text: string; score: number };

  const rest = [...paras];
  const sentences = rest[hit.p].split(/(?<=[.!?])\s+/);
  const remaining = sentences.filter((_, j) => j !== hit.s).join(" ").trim();
  if (remaining) rest[hit.p] = remaining;
  else rest.splice(hit.p, 1);

  return { heritage: hit.text, rest };
}

function resolvePhoto(
  vin: string,
  key: "engine" | "exterior" | "interior",
  photos: string[]
): string | undefined {
  const seen = VERIFIED_PHOTOS[vin];
  if (seen && key !== "exterior") {
    const url = seen[key];
    // null = reviewed and confirmed absent. undefined = not reviewed yet.
    if (url === null) return undefined;
    if (url) return url;
  }
  return topicPhoto(photos, key);
}

export function buildBreakdown(v: Vehicle): Breakdown {
  const photos = displayImages(v);
  const description = displayDescription(v);
  const curated = CURATED[v.vin];

  const { heritage: derivedHeritage, rest } = extractHeritage(paragraphsOf(description));
  const sections = breakdownSections(rest.join("\n"));

  const rows: BreakdownRow[] = [];

  // Spec-derived copy for topics the listing never mentions, so a thin
  // description doesn't collapse the section to a single row. Only fields the
  // DMS actually supplied.
  const fallback: Record<"engine" | "exterior" | "interior", string> = {
    engine: [
      `${v.year} ${v.make} ${v.model}${v.trim ? ` ${v.trim}` : ""}.`,
      v.transmission ? `${v.transmission} transmission.` : "",
      v.odometer != null ? `${v.odometer.toLocaleString("en-US")} miles.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    exterior: [
      v.exteriorColor ? `Finished in ${v.exteriorColor}.` : "",
      photos.length ? `${photos.length} photographs on file.` : "",
    ]
      .filter(Boolean)
      .join(" "),
    interior: v.interiorColor ? `${v.interiorColor} interior.` : "",
  };

  TOPICS.forEach(({ key, topic }) => {
    const c = curated?.rows?.[key];
    const body = c?.body ?? sections[key] ?? "";
    const resolved = body.trim() || fallback[key];
    if (!resolved) return;

    const topicText = `${resolved} ${key === "engine" ? description : ""}`;

    rows.push({
      n: String(rows.length + 1).padStart(2, "0"),
      topic,
      title: c?.title ?? firstSentence(resolved) ?? topic,
      body: resolved,
      // Order of trust: hand-curated → reviewed by eye → positional guess.
      // A reviewed `null` is meaningful — that car has no photograph of this
      // topic — so it suppresses the image instead of falling through to a
      // guess that would show the wrong thing.
      img: c?.img ?? resolvePhoto(v.vin, key, photos),
      objectPosition: c?.objectPosition,
      stats: key === "engine" ? c?.stats ?? statsFromCopy(topicText) : undefined,
      chips: c?.chips ?? chipsFromCopy(resolved),
    });
  });

  return {
    rows,
    heritage: curated?.heritage ?? derivedHeritage,
    pull: curated?.pull,
  };
}

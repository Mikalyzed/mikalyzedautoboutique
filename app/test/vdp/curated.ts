import type { Chip, Stat } from "./breakdown";

/**
 * Art-directed Breakdown content, keyed by VIN.
 *
 * Everything here is transcribed from that car's own listing — no spec is
 * invented. What curation adds is judgement the feed can't supply: which photo
 * actually shows the engine bay, a headline worth reading, and which facts
 * deserve to be chips.
 *
 * The 2012 SLS AMG is the reference vehicle the mockups were built on, so it's
 * seeded to match mikalyzed-vdp-final.html exactly. Cars without an entry fall
 * back to derivation in buildBreakdown().
 */

const DC = "https://imagesdl.dealercenter.net/1920/1440";

type CuratedRow = {
  title: string;
  body?: string;
  img?: string;
  objectPosition?: string;
  stats?: Stat[];
  chips?: Chip[];
};

export type CuratedVehicle = {
  pull?: string;
  heritage?: string;
  rows: Partial<Record<"engine" | "exterior" | "interior", CuratedRow>>;
};

export const CURATED: Record<string, CuratedVehicle> = {
  // 2012 Mercedes-Benz SLS AMG — the mockup's reference car.
  WDDRJ7HAXCA007214: {
    pull: "One of the most desirable AMG models ever produced — the first car AMG built fully in-house, finished silver over red and wearing a widebody.",
    heritage: "Direct descendant of the 300SL Gullwing — AMG's first ground-up car.",
    rows: {
      engine: {
        title: "6.2L M159 V8 — naturally aspirated",
        body: "One of AMG's most celebrated engines. Instant throttle response, an unmistakable exhaust note, and not a turbo in sight. Behind it, a 7-speed dual-clutch sends power to the rear wheels through a rear transaxle — front mid-engine balance, a true driver-focused setup. And it's fully stock underneath: unmodified engine and transmission, factory reliability with the pure SLS dynamics intact.",
        img: `${DC}/202604-788699e5312848d68c5a7b7f686ad98a.jpg`,
        objectPosition: "50% 38%",
        stats: [
          { n: "563", unit: "hp", l: "Factory rated" },
          { n: "479", unit: "lb-ft", l: "Torque" },
          { n: "RWD", l: "Rear transaxle" },
        ],
        chips: [{ label: "✓ Fully stock", ok: true }, { label: "7-speed dual-clutch" }],
      },
      exterior: {
        title: "Widebody on ANRKY wheels",
        body: "Iridium Silver Metallic with an aggressive, commanding presence that still reads factory-intentional. Wrapped in Pirelli P Zero.",
        img: `${DC}/202604-27e34a75d1af4f149439664e40ee4f77.jpg`,
        chips: [{ label: "Widebody" }, { label: "ANRKY wheels" }, { label: "Pirelli P Zero" }],
      },
      interior: {
        title: "Classic Red leather",
        body: "Factory finishes throughout, very well kept. Craftsmanship you can feel from the driver's seat.",
        img: `${DC}/202604-6ae6b4a0ed434f8da02db2cbd2c34e93.jpg`,
        chips: [{ label: "Classic Red leather" }, { label: "Factory finishes" }],
      },
    },
  },
};

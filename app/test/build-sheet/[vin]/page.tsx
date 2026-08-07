import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../home.css";
import "../sheet.css";
import { getVehicleByVin } from "@/lib/vehicles";
import { displayDescription, displayImages, priceLabel, vehicleName } from "../../lib";
import PrintButton from "../PrintButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Build Sheet — Mikalyzed Auto Boutique",
  robots: { index: false, follow: false },
};

const ADDRESS = "MIKALYZED AUTO BOUTIQUE · 3455 NW 30TH AVE, MIAMI, FL";

/** Split "563 hp" into number + unit so the unit can sit small and mono. */
function splitUnit(value: string): [string, string] {
  const m = value.match(/^([\d.,]+)\s*(.*)$/);
  return m ? [m[1], m[2]] : [value, ""];
}

export default async function BuildSheet({ params }: { params: Promise<{ vin: string }> }) {
  const { vin } = await params;
  const v = await getVehicleByVin(vin);
  if (!v) notFound();

  const photos = displayImages(v);
  const name = vehicleName(v);
  const [head, ...tail] = (v.model || name).split(" ");
  const description = displayDescription(v);

  // Fact policy from §8: listing-verified data only. Anything the DMS didn't
  // give us is simply omitted rather than guessed at.
  const stats: [string, string][] = [];
  if (v.odometer != null) stats.push(["ODOMETER", `${v.odometer.toLocaleString("en-US")} MI`]);
  if (v.year) stats.push(["YEAR", String(v.year)]);
  if (v.transmission) stats.push(["TRANSMISSION", v.transmission]);
  if (v.exteriorColor) stats.push(["EXTERIOR", v.exteriorColor]);
  while (stats.length < 4 && v.stockNumber) {
    stats.push(["STOCK", v.stockNumber]);
    break;
  }

  const identification: [string, string][] = [
    ["VIN", v.vin],
    v.stockNumber ? ["STOCK", v.stockNumber] : null,
    v.trim ? ["TRIM", v.trim] : null,
    v.odometer != null ? ["MILEAGE", `${v.odometer.toLocaleString("en-US")} miles`] : null,
    ["LOCATION", "Miami, FL"],
  ].filter(Boolean) as [string, string][];

  const finish: [string, string][] = [
    v.exteriorColor ? ["EXTERIOR", v.exteriorColor] : null,
    v.interiorColor ? ["INTERIOR", v.interiorColor] : null,
  ].filter(Boolean) as [string, string][];

  const powertrain: [string, string][] = [
    v.transmission ? ["TRANSMISSION", v.transmission] : null,
    v.year ? ["MODEL YEAR", String(v.year)] : null,
    ["MAKE", v.make],
    ["MODEL", v.model],
  ].filter(Boolean) as [string, string][];

  const listing: [string, string][] = [
    ["PRICE", priceLabel(v)],
    ["STATUS", v.status === "available" ? "Available" : v.status],
    [`PHOTOS`, String(photos.length)],
  ];

  const cards: { name: string; rows: [string, string][] }[] = [
    { name: "POWERTRAIN", rows: powertrain },
    { name: "FINISH", rows: finish },
    { name: "IDENTIFICATION", rows: identification },
    { name: "LISTING", rows: listing },
  ].filter((c) => c.rows.length > 0);

  return (
    <>
      <div className="sheetBar">
        <Link className="ctaGhost" href={`/test/vdp/${v.vin}`}>
          ← Back to the car
        </Link>
        <PrintButton />
        <span className="note">Print · destination “Save as PDF” · margins none</span>
      </div>

      <div className="sheetPage">
        <div className="sheetBreadcrumb">
          INVENTORY / {v.year} {name.toUpperCase()}
        </div>

        <div className="sheetStatus">
          <i />
          {v.year} · {v.make.toUpperCase()}
        </div>

        <div className="sheetMast">
          <h1>
            {head} {tail.length > 0 && <span className="thin">{tail.join(" ")}</span>}
          </h1>
          <div>
            <div className="sheetPriceLabel">OFFERED AT</div>
            <div className="sheetPrice">{priceLabel(v)}</div>
          </div>
        </div>

        {(v.trim || v.exteriorColor || v.interiorColor) && (
          <div className="sheetSub">
            {v.trim && <b>{v.trim}</b>}
            <span>
              {v.trim && (v.exteriorColor || v.interiorColor) ? " · " : ""}
              {v.exteriorColor}
              {v.exteriorColor && v.interiorColor ? " over " : ""}
              {v.interiorColor}
            </span>
          </div>
        )}

        {photos.length > 0 && (
          <>
            <div className="sheetTheater">
              <div className="sheetWing left">
                {photos[1] && <Image src={photos[1]} alt="" width={400} height={300} unoptimized />}
              </div>
              <div className="sheetHero">
                <Image src={photos[0]} alt={`${v.year} ${name}`} width={880} height={660} unoptimized priority />
              </div>
              <div className="sheetWing right">
                {photos[2] && <Image src={photos[2]} alt="" width={400} height={300} unoptimized />}
              </div>
            </div>
            <div className="sheetDots">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} className={i === 1 ? "on" : undefined} />
              ))}
            </div>
          </>
        )}

        {stats.length > 0 && (
          <div className="sheetStats">
            {stats.slice(0, 4).map(([k, val]) => {
              const [num, unit] = splitUnit(val);
              return (
                <div className="sheetCard sheetStat" key={k}>
                  <div className="k">{k}</div>
                  <div className="v">
                    {num}
                    {unit && <span>{unit}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="sheetGrid">
          {cards.map((c, i) => (
            <div className="sheetCard" key={c.name}>
              <div className="sheetSecHead">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="sl">/</span>
                <span>{c.name}</span>
              </div>
              <div className="sheetRule" />
              <div className="sheetTick" />
              <div style={{ marginTop: ".3rem" }}>
                {c.rows.map(([k, val]) => (
                  <div className="sheetRow" key={k + val}>
                    <span className="k">{k}</span>
                    <span className="v">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {description && (
          <div className="sheetCard sheetBand">
            <div className="sheetSecHead">
              <span className="num">{String(cards.length + 1).padStart(2, "0")}</span>
              <span className="sl">/</span>
              <span>PROVENANCE</span>
            </div>
            <div className="sheetRule" />
            <div className="sheetTick" />
            <p>{description.split(/\n{2,}/)[0].slice(0, 620)}</p>
          </div>
        )}

        <div className="sheetFooter">
          <div>
            <div className="l">{ADDRESS}</div>
            <div className="disc">ALL SPECIFICATIONS PER LISTING AT TIME OF PUBLICATION.</div>
          </div>
          <div className="r">(305) 720-2533 · MIKALYZEDAUTOBOUTIQUE.COM</div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../home.css";
import "../vdp.css";
import { getVehicleByVin } from "@/lib/vehicles";
import { displayImages, miles, priceLabel, priceNumber, vehicleName } from "../../lib";
import { Nav, Footer } from "../../components/Chrome";
import Theater from "../Theater";
import RailPanel from "../RailPanel";
import { buildBreakdown } from "../breakdown";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "VDP Preview — Mikalyzed Auto Boutique",
  robots: { index: false, follow: false },
};

const DOCS = [
  "Multi-point inspection report",
  "Service records",
  "Work performed & receipts",
  "Title & registration",
];

export default async function TestVdp({ params }: { params: Promise<{ vin: string }> }) {
  const { vin } = await params;
  const v = await getVehicleByVin(vin);
  if (!v) notFound();

  const photos = displayImages(v);
  const name = vehicleName(v);
  const price = priceLabel(v);
  const asking = priceNumber(v);
  // Model name split for the weight-contrast headline: first word heavy, rest thin.
  const [head, ...tail] = (v.model || name).split(" ");

  const { rows, heritage, pull } = buildBreakdown(v);

  return (
    <>
      <Nav active="/test/vdp" />

      <header>
        <div className="thx">
          <div className="heroTopRow">
            <div className="crumb">
              <Link href="/test/inventory">Inventory</Link> &nbsp;/&nbsp; {v.year} {name}
            </div>
            <div className="phChip">{photos.length} PHOTOS</div>
          </div>

          <div className="thHead">
            <div>
              <div className="heroEyebrow">
                <span className="dot" />
                {v.year} · {v.make} · Available in Miami
              </div>
              <h1 className="tThea">
                {head} {tail.length > 0 && <span className="thin">{tail.join(" ")}</span>}
              </h1>
              <div className="heroSub">
                {v.trim && <b>{v.trim}</b>}
                {v.trim && (v.exteriorColor || v.interiorColor) ? " · " : ""}
                {v.exteriorColor}
                {v.exteriorColor && v.interiorColor ? " over " : ""}
                {v.interiorColor}
              </div>
            </div>
            <div className="thPrice">
              <div className="hpP">{price}</div>
              {asking && (
                <div className="hpM">
                  ~${Math.round((asking / 72) * 1.12).toLocaleString()}/MO EST. FINANCING
                </div>
              )}
              <Link className="ctaGlass acc thCta" href={`/test/build-sheet/${v.vin}`}>
                Build sheet<span className="ar">→</span>
              </Link>
            </div>
          </div>

          {photos.length > 0 && <Theater photos={photos} alt={`${v.year} ${name}`} />}
        </div>
      </header>

      <div className="datastrip">
        <div className="dsItem">
          <div className="k">Mileage</div>
          <div className="v">{miles(v)}</div>
        </div>
        <div className="dsItem">
          <div className="k">Gearbox</div>
          <div className="v">{v.transmission || "—"}</div>
        </div>
        <div className="dsItem">
          <div className="k">Exterior</div>
          <div className="v">{v.exteriorColor || "—"}</div>
        </div>
        <div className="dsItem">
          <div className="k">Interior</div>
          <div className="v">{v.interiorColor || "—"}</div>
        </div>
        <div className="dsItem">
          <div className="k">Stock</div>
          <div className="v monoV">{v.stockNumber || "—"}</div>
        </div>
        <div className="dsItem">
          <div className="k">VIN</div>
          <div className="v monoV">{v.vin}</div>
        </div>
      </div>

      <div className="vdpLayout">
        <main className="content">
          {rows.length > 0 && (
            <section>
              <div className="eyebrow">Why this car</div>
              <h2>The Breakdown</h2>
              <p className="pull">
                {pull ?? (
                  <>
                    {v.year} {name}
                    {v.trim ? ` ${v.trim}` : ""} — photographed, documented, and described from the
                    listing, not from a brochure.
                  </>
                )}
              </p>

              <div className="brk">
                {rows.map((r, i) => (
                  // Row 02 flips so the photo alternates sides; the grid is
                  // align-items:stretch, so each photo fills its half at
                  // whatever height the paragraph settles on.
                  <article className={`brow rvl${i % 2 === 1 ? " flip" : ""}`} key={r.n}>
                    <div className="bTxt">
                      <div className="label">
                        {r.n} · {r.topic}
                      </div>
                      <h3>{r.title}</h3>
                      <p>{r.body}</p>

                      {r.stats && r.stats.length > 0 && (
                        <div className="statRow">
                          {r.stats.map((s) => (
                            <div className="stat" key={s.l}>
                              <div className="n">
                                {s.n}
                                {s.unit && <span>{s.unit}</span>}
                              </div>
                              <div className="l">{s.l}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {r.chips && r.chips.length > 0 && (
                        <div className="bChips">
                          {r.chips.map((c) => (
                            <span key={c.label} className={c.ok ? "ok" : undefined}>
                              {c.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bImg">
                      {r.img && (
                        <Image
                          src={r.img}
                          alt={`${v.year} ${name} — ${r.topic.toLowerCase()}`}
                          fill
                          sizes="(max-width:1180px) 100vw, 45vw"
                          style={{ objectFit: "cover", objectPosition: r.objectPosition }}
                        />
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {heritage && (
                <div className="plaque rvl">
                  <span className="pm">◆</span>
                  <span className="pt">{heritage}</span>
                  <span className="ph">Heritage</span>
                </div>
              )}
            </section>
          )}

          <section style={{ marginBottom: 0 }}>
            <div className="eyebrow">Do the homework</div>
            <h2>Documented, not promised</h2>
            <p className="pull">
              Every Mikalyzed car ships with its paperwork. Pull the files yourself before you ever
              pick up the phone.
            </p>
            <div className="proof">
              <div className="panel">
                <div className="eyebrow">Documentation</div>
                <div className="ph">Files on this vehicle</div>
                <Link className="docRow" href={`/test/build-sheet/${v.vin}`}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </span>
                  Build sheet
                  <span className="dl">↓ PRINT</span>
                </Link>
                {DOCS.map((d) => (
                  <div className="docRow" key={d}>
                    <span className="ic">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                    </span>
                    {d}
                    <span className="dl">— on request</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <aside>
          <RailPanel price={price} askingNumber={asking} />
        </aside>
      </div>

      <div className="mbar">
        <div>
          <div className="mp">{price}</div>
          <div className="mm">{miles(v)}</div>
        </div>
        <Link className="railCta" href={`/test/build-sheet/${v.vin}`}>
          Build sheet
        </Link>
      </div>

      <Footer />
    </>
  );
}

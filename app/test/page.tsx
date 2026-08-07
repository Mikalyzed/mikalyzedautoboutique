import Image from "next/image";
import Link from "next/link";
import "./home.css";
import { getAvailableVehicles } from "@/lib/vehicles";
import { displayImages, priceLabel, vdpHref, vehicleName } from "./lib";
import { Nav, Footer, PHONE, PHONE_HREF } from "./components/Chrome";
import Rail from "./components/Rail";
import { Accordion, CountUp, InertForm } from "./components/Widgets";

export const dynamic = "force-dynamic";

const TICKER = [
  "Classics",
  "Exotics",
  "Customs",
  "Consignment",
  "The Reserve Storage",
  "Nationwide Enclosed Delivery",
  "Allapattah · Miami",
  PHONE,
];

const WAY = [
  { title: "Curated inventory", body: "Hand-selected vehicles only. Condition, spec, and provenance matter here — if it doesn't meet the bar, it doesn't make the floor." },
  { title: "Nationwide shipping", body: "Fully insured, enclosed transport to all 50 states — arranged door to door, tracked the whole way." },
  { title: "White-glove experience", body: "A concierge-level process from first conversation to delivery. One point of contact, zero runaround." },
  { title: "Consignment", body: "Professionally shot, listed, represented, and marketed — maximum exposure and a smooth process to the wire." },
  { title: "Vehicle sourcing", body: "Chasing something specific? Give us the year, spec, and colors — we hunt cars down for clients every week." },
  { title: "Global transactions", body: "International buyers, sellers, export paperwork, and logistics — handled without the headache." },
  { title: "Financing & trades", body: "Financing options on approved credit, and trades are always welcome — bring what you have, leave with what you want." },
];

const SERVICES = [
  {
    n: "01",
    eyebrow: "Buy",
    title: ["Buy with ", "confidence"],
    body: "Every car in the collection is hand-selected, fully photographed, and documented. Condition, spec, and provenance matter here — you see the whole story before you ever call.",
    chips: ["Certified vehicles", "Financing options", "Nationwide delivery"],
    img: "/gallery/P1901157.jpg",
    alt: "Inside the Mikalyzed showroom",
    ctas: [{ label: "Explore inventory", href: "/test/inventory", acc: true }],
    flip: false,
  },
  {
    n: "02",
    eyebrow: "Sell · Consign",
    title: ["Sell it the ", "right way"],
    body: "Maximum exposure, proper representation, and a smooth process. Expert appraisal, real market analysis, and white-glove handling from first conversation to wire.",
    chips: ["Free appraisal", "Market analysis", "White-glove service"],
    img: "/gallery/P1900928.jpg",
    alt: "Mikalyzed Auto Boutique facility",
    ctas: [{ label: "Get an appraisal", href: "#contact", acc: true }],
    flip: true,
  },
  {
    n: "03",
    eyebrow: "Store · The Reserve",
    title: ["Storage for serious ", "collections"],
    body: "Climate-controlled, monitored around the clock, and fully insured — inside a facility with a showroom, cigar lounge, client lounge, and full bar. Storage worth visiting.",
    chips: ["Climate controlled", "GPS tracking", "Full insurance"],
    img: "/showroom.jpg",
    alt: "The Reserve at Mikalyzed",
    ctas: [
      { label: "Reserve a space", href: "#contact", acc: true },
      { label: "Learn more", href: "#contact", acc: false },
    ],
    flip: false,
  },
];

const GALLERY = ["/gallery/P1900928.jpg", "/gallery/P1901037.jpg", "/gallery/P1901157.jpg", "/gallery/P1900950.jpg"];

export default async function TestHome() {
  const all = await getAvailableVehicles();
  const visible = all.filter((v) => !v.hidden);
  // Featured first, then whatever else is available — matches how the live
  // homepage picks its rail without needing a second query.
  const featured = [...visible].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 6);

  return (
    <>
      <Nav active="/test" />

      <header>
        <div className="blx">
          <div className="blFrame">
            <Image src="/showroom.jpg" alt="Mikalyzed showroom" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
            <div className="blScrim" />
            <div className="blOl">
              <div className="blId">
                <div className="heroEyebrow">
                  <span className="dot" />
                  Miami · Classics · Exotics · Customs
                </div>
                <h1 className="tBill">
                  Not a dealership.
                  <br />
                  <span className="thin">A boutique.</span>
                </h1>
                <p className="blSub">
                  Classics, exotics, and customs — curated, consigned, and stored under one roof in
                  Allapattah, Miami.
                </p>
              </div>
              <div className="blCta">
                <Link className="cta" href="/test/inventory">
                  Explore inventory
                </Link>
                <a className="ctaGhost" href="#contact">
                  Sell your car
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="tkBand">
          <div className="tkInner">
            {[0, 1].map((k) => (
              <span className="tkSet" key={k} aria-hidden={k === 1}>
                {TICKER.map((t) => (
                  <span key={t}>
                    {t} <b>◆</b>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="wrap">
        <section>
          <div className="secHead rvl">
            <div>
              <div className="eyebrow">In the showroom right now</div>
              <h2>
                The current <span className="thin">lineup</span>
              </h2>
            </div>
          </div>
          <Rail>
            {featured.map((v) => {
              const imgs = displayImages(v);
              return (
                <Link className="rcard" data-rail-card href={vdpHref(v)} key={v.vin}>
                  <div className="im">
                    {imgs[0] && (
                      <Image src={imgs[0]} alt={`${v.year} ${vehicleName(v)}`} fill sizes="480px" style={{ objectFit: "cover" }} />
                    )}
                  </div>
                  <span className="phChip">{imgs.length} PHOTOS</span>
                  <div className="cap">
                    <div>
                      <div className="y">{v.year}</div>
                      <div className="n">{vehicleName(v)}</div>
                    </div>
                    <div className="p">{priceLabel(v)}</div>
                  </div>
                </Link>
              );
            })}
          </Rail>
          <div style={{ marginTop: ".4rem" }}>
            <Link className="secLink" href="/test/inventory">
              All {visible.length} vehicles →
            </Link>
          </div>
        </section>

        <div className="stats rvl">
          <div className="statB">
            <div className="n">
              <CountUp to={visible.length} />
            </div>
            <div className="l">Vehicles in stock</div>
          </div>
          <div className="statB">
            <div className="n">
              <CountUp to={50} />
            </div>
            <div className="l">States we deliver to</div>
          </div>
          <div className="statB">
            <div className="n">1</div>
            <div className="l">Roof — buy, sell &amp; store</div>
          </div>
        </div>

        <section>
          {SERVICES.map((s) => (
            <div className={`svc rvl${s.flip ? " flip" : ""}`} key={s.n}>
              <div className="sImg">
                <Image src={s.img} alt={s.alt} fill sizes="(max-width:1100px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="sTxt">
                <div className="sGhost">{s.n}</div>
                <div className="eyebrow">{s.eyebrow}</div>
                <h2>
                  {s.title[0]}
                  <span className="thin">{s.title[1]}</span>
                </h2>
                <p>{s.body}</p>
                <div className="sChips">
                  {s.chips.map((c) => (
                    <span key={c}>
                      <b>◆</b>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="sCtas">
                  {s.ctas.map((c) => (
                    <Link className={`ctaGlass${c.acc ? " acc" : ""}`} href={c.href} key={c.label}>
                      {c.label}
                      <span className="ar">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="mani rvl">
            <div>
              <div className="eyebrow">The Mikalyzed way</div>
              <p className="maniBig" style={{ marginTop: "1.2rem" }}>
                The cars are <b>curated</b>. The process is <b>handled</b>. The details are{" "}
                <em>obsessed over</em>.
              </p>
              <p className="maniSub">
                From first message to keys in hand — one point of contact, total transparency, zero
                pressure. Whatever you need done with a car, it&apos;s under this roof.
              </p>
            </div>
            <Accordion items={WAY} />
          </div>
        </section>
      </div>

      <div className="gstrip rvl">
        {GALLERY.map((g) => (
          <div className="gcell" key={g}>
            <Image src={g} alt="Life at the boutique" fill sizes="25vw" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
      <div className="gstripCap">
        <span>Life at the boutique</span>
        <span>@mikalyzedautoboutique →</span>
      </div>

      <div className="wrap">
        <section id="contact">
          <div className="contact rvl">
            <Image className="cBg" src="/gallery/P1901037.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
            <div className="cScrim" />
            <div>
              <div className="eyebrow">Start here</div>
              <h2>
                Looking for something <span className="thin">specific?</span>
              </h2>
              <p className="cSub">
                Buying, selling, sourcing, or storing — one message starts it. We reply to every
                request.
              </p>
              <div className="cPoints">
                <div className="cPt">
                  <b>◆</b> Nationwide delivery
                </div>
                <div className="cPt">
                  <b>◆</b> Financing available
                </div>
                <div className="cPt">
                  <b>◆</b> Trades welcome
                </div>
              </div>
              <div className="cDirect">
                <a className="ph" href={PHONE_HREF}>
                  {PHONE}
                </a>
                <div className="ad">3455 NW 30th Ave · Allapattah · Miami, FL</div>
              </div>
            </div>
            <div>
              <InertForm />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

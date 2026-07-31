"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VehicleViewContent from "@/app/components/VehicleViewContent";
import type { VdpData } from "./data";

// Mock Q&A threads (BaT-style). Real data + accounts wired later.
const QA: {
  initials: string;
  user: string;
  time: string;
  up: number;
  q: string;
  a: string | null;
  atime: string | null;
}[] = [
  {
    initials: "MG",
    user: "mike_g",
    time: "2 days ago",
    up: 12,
    q: "Any documented service history with the car? Records available?",
    a: "Yes — full documented service history comes with it. Happy to email the file, just send us your address.",
    atime: "2 days ago",
  },
  {
    initials: "CR",
    user: "carlos_305",
    time: "4 days ago",
    up: 7,
    q: "Would you ship to California? Ballpark on cost?",
    a: "We ship nationwide, fully enclosed and insured. CA runs roughly $1,200–$1,600 depending on the schedule — we handle the whole thing.",
    atime: "4 days ago",
  },
  {
    initials: "VH",
    user: "vintage_hunter",
    time: "6 days ago",
    up: 4,
    q: "Is the price firm, or is there any room to talk?",
    a: "Give us a call — we're always reasonable with serious buyers.",
    atime: "5 days ago",
  },
  {
    initials: "JT",
    user: "jturner",
    time: "1 week ago",
    up: 2,
    q: "Can you post an undercarriage shot and a cold-start clip?",
    a: null,
    atime: null,
  },
];

// Scan the description for known car-feature keywords → clean canonical labels
// (never prose fragments). Ordered by how sale-relevant they tend to be.
const FEATURE_RULES: [RegExp, string][] = [
  [/supercharg/i, "Supercharged"],
  [/\bturbo/i, "Turbocharged"],
  [/\b(ls\s?swap|ls[1-9]|engine swap|swapped)\b/i, "Engine swap"],
  [/\b(manual|stick shift|\d[\s-]?speed manual|\bg50\b)\b/i, "Manual transmission"],
  [/\b(automatic|pdk|tiptronic|\bdct\b|dual[\s-]?clutch)\b/i, "Automatic transmission"],
  [/restor/i, "Restored"],
  [/numbers[\s-]?matching/i, "Numbers-matching"],
  [/\b(one|1)[\s-]?owner\b/i, "One owner"],
  [/low[\s-]?mile/i, "Low mileage"],
  [/widebody|wide[\s-]?body/i, "Widebody"],
  [/convertible|cabriolet|drop[\s-]?top/i, "Convertible"],
  [/leather/i, "Leather interior"],
  [/recaro/i, "Recaro seats"],
  [/heated seat/i, "Heated seats"],
  [/\b(sunroof|moonroof)\b/i, "Sunroof"],
  [/\b(navigation|nav system)\b/i, "Navigation"],
  [/\b(bose|premium (sound|audio)|harman|kardon)\b/i, "Premium audio"],
  [/back[\s-]?up camera|reverse camera|rear camera/i, "Backup camera"],
  [/cold air intake/i, "Cold air intake"],
  [/\b(borla|magnaflow|flowmaster|exhaust)\b/i, "Upgraded exhaust"],
  [/brembo/i, "Brembo brakes"],
  [/big brake|\bbbk\b/i, "Big brake kit"],
  [/coilover|air[\s-]?ride|bagged|lowered/i, "Lowered suspension"],
  [/carbon[\s-]?fiber/i, "Carbon fiber"],
  [/\b(forged|fuchs|\bhre\b|\bbbs\b|custom wheels|aftermarket wheels)\b/i, "Upgraded wheels"],
  [/\b(a\/c|air conditioning)\b/i, "Air conditioning"],
];
function extractFeatures(desc?: string): string[] {
  if (!desc) return [];
  const out: string[] = [];
  for (const [re, label] of FEATURE_RULES) {
    if (out.length >= 8) break;
    if (re.test(desc) && !out.includes(label)) out.push(label);
  }
  return out;
}

export default function View({ v, recommended, fontClass }: VdpData & { fontClass: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const loadedAt = useRef(Date.now());
  const [hp, setHp] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  const priceText = v.isAuction ? v.auctionLabel : v.price;
  const monthly = v.numericPrice && !v.isAuction ? Math.round(v.numericPrice * 0.0155) : null;
  const gallery = v.images.slice(0, 5);
  const extra = Math.max(0, v.images.length - 5);

  const storyFeatures = extractFeatures(v.description);
  const baseFeatures = [
    v.transmission ? `${v.transmission} transmission` : null,
    v.exteriorColor && v.interiorColor ? `${v.exteriorColor} over ${v.interiorColor}` : v.exteriorColor ? `${v.exteriorColor} exterior` : null,
    v.odometer !== undefined ? `${v.odometer.toLocaleString()} miles` : null,
    "Clean title",
    "Nationwide delivery",
  ].filter(Boolean) as string[];
  const features = Array.from(new Set([...storyFeatures, ...baseFeatures])).slice(0, 8);

  const facts: { label: string; value: string; mono?: boolean }[] = [];
  if (v.odometer !== undefined) facts.push({ label: "Mileage", value: `${v.odometer.toLocaleString()} mi` });
  if (v.transmission) facts.push({ label: "Transmission", value: v.transmission });
  facts.push({ label: "Year", value: String(v.year) });
  if (v.exteriorColor) facts.push({ label: "Exterior", value: v.exteriorColor });
  if (v.interiorColor) facts.push({ label: "Interior", value: v.interiorColor });
  if (v.trim) facts.push({ label: "Trim", value: v.trim });
  facts.push({ label: "Title", value: "Clean" });
  facts.push({ label: "VIN", value: v.vin, mono: true });

  const fireIntent = () => {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (w.fbq) w.fbq("track", "InitiateCheckout", { content_ids: [v.contentId], content_type: "vehicle" });
  };
  const scrollToForm = () => {
    fireIntent();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => nameRef.current?.focus(), 400);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: "",
          formType: "contact",
          service: "Buying a car",
          message: `[VDP inquiry] ${v.name} — ${priceText} (${v.vin})`,
          source: "vdp-v2",
          vehicleVin: v.vin,
          vehicleName: v.name,
          _hp: hp,
          _ts: loadedAt.current,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        const w = window as unknown as {
          fbq?: (...a: unknown[]) => void;
          gtag?: (...a: unknown[]) => void;
        };
        if (w.fbq) w.fbq("track", "Lead", { content_ids: [v.contentId], content_type: "vehicle" });
        if (w.gtag) {
          w.gtag("event", "conversion_event_contact_1");
          w.gtag("event", "vehicle_inquiry", { event_category: "lead", event_label: v.name, value: 1 });
        }
      }
    } catch (err) {
      console.error("vdp-v2 lead submit failed:", err);
    }
    setSubmitting(false);
  };

  return (
    <div className={`v-root ${fontClass}`}>
      <style>{CSS}</style>
      <VehicleViewContent contentId={v.contentId} vehicleName={v.name} price={v.numericPrice} />

      {/* NAV */}
      <nav className="v-nav">
        <div className="v-navpill">
          <Link href="/home-v2" className="v-logo">
            MIKALYZED <span>AUTO BOUTIQUE</span>
          </Link>
          <div className="v-navlinks">
            <Link href="/inventory">Inventory</Link>
            <Link href="/sold">Sold</Link>
            <Link href="/reserve">The Reserve</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About</Link>
          </div>
          <a href="tel:+13057202533" className="v-navcta">Call Now</a>
        </div>
      </nav>

      {/* HEAD + GALLERY */}
      <header className="v-head">
        <div className="v-wrap">
          <div className="v-crumbs">
            <Link href="/">Home</Link> / <Link href="/inventory">Inventory</Link> /{" "}
            <span style={{ color: "var(--white)" }}>{v.name}</span>
          </div>
          <div className="v-titlerow">
            <div>
              <h1 className="v-h1">
                {v.year} {v.make} <em>{v.model}{v.trim ? ` ${v.trim}` : ""}</em>
              </h1>
              <div className="v-titlemeta">
                <span className="v-tag v-tag--lime">{v.isAuction ? "Auction" : "Available"}</span>
                {v.odometer !== undefined && <span className="v-tag">{v.odometer.toLocaleString()} mi</span>}
                {v.transmission && <span className="v-tag">{v.transmission}</span>}
                <span className="v-tag">Miami, FL</span>
              </div>
            </div>
          </div>

          <div className="v-gallery">
            {gallery.length > 0 ? (
              gallery.map((src, i) => (
                <div key={src} className={`v-g ${i === 0 ? "v-gmain" : ""} ${i === 4 ? "v-gmore" : ""}`}>
                  <Image
                    src={src}
                    alt={`${v.name} photo ${i + 1}`}
                    fill
                    sizes={i === 0 ? "(max-width:860px) 100vw, 620px" : "220px"}
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                  {i === 0 && (
                    <span className="v-chip v-gbadge">
                      <span className="v-dot" />
                      {v.images.length} Photos
                    </span>
                  )}
                  {i === 4 && extra > 0 && (
                    <div className="v-goverlay">
                      <b>+{extra}</b>
                      <span>View all photos</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="v-g v-gmain"><span className="v-ph">NO PHOTOS YET</span></div>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="v-wrap v-body">
        <main>
          <div className="v-dossier">
            {facts.map((f) => (
              <div key={f.label} className={`v-fact ${f.mono ? "v-fact--vin" : ""}`}>
                <span>{f.label}</span>
                <b>{f.value}</b>
              </div>
            ))}
          </div>

          <div className="v-card">
            <h2 className="v-cardh">Features</h2>
            <div className="v-features">
              {features.map((h) => (
                <div key={h} className="v-feat">
                  <span className="v-feat-ic">✓</span>
                  <span className="v-feat-label">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="v-card v-desc">
            <h2 className="v-cardh">The Story</h2>
            {v.description ? (
              <>
                <p className={`v-desc__p ${storyOpen ? "" : "is-clamped"}`} style={{ whiteSpace: "pre-line" }}>
                  {v.description}
                </p>
                <button type="button" className="v-story-toggle" onClick={() => setStoryOpen((o) => !o)}>
                  {storyOpen ? "Read less" : "Read more"}
                  <span className="v-story-chev">{storyOpen ? "▲" : "▼"}</span>
                </button>
              </>
            ) : (
              <p>
                A hand-picked addition to the Mikalyzed floor. Come see it in the Allapattah showroom, or
                we&apos;ll arrange enclosed delivery to your door. Full walkaround and details available on
                request.
              </p>
            )}
          </div>

          {v.videoUrl && (
            <div className="v-card">
              <h2 className="v-cardh">Walkaround Video</h2>
              {v.videoUrl.includes("cloudflarestream.com") ? (
                <iframe
                  src={`${v.videoUrl.replace("/watch", "/iframe")}?muted=true&loop=true`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{ width: "100%", aspectRatio: "16/9", border: 0, borderRadius: "var(--r)" }}
                />
              ) : (
                <video src={v.videoUrl} muted loop playsInline controls style={{ width: "100%", borderRadius: "var(--r)" }} />
              )}
            </div>
          )}
          {/* QUESTIONS & COMMENTS */}
          <div className="v-card" id="questions">
            <h2 className="v-cardh">
              Questions <span className="v-qcount">{QA.length}</span>
            </h2>

            <div className="v-qa-gate">
              <div className="v-qa-gatebox">
                <div className="v-qa-lock">🔒</div>
                <div>
                  <b>Join the conversation</b>
                  <span>Create a free account to ask the seller a question — we reply to every one.</span>
                </div>
              </div>
              <Link href="/sign-in" className="v-btn v-btn-lime" style={{ width: "auto" }}>
                Sign in to ask
              </Link>
            </div>

            <div className="v-threads">
              {QA.map((t) => (
                <div className="v-thread" key={t.user}>
                  <div className="v-avatar">{t.initials}</div>
                  <div className="v-tbody">
                    <div className="v-tmeta">
                      <b>{t.user}</b>
                      <span>{t.time}</span>
                    </div>
                    <p className="v-tmsg">{t.q}</p>
                    <div className="v-tactions">
                      <span className="v-up">▲ {t.up}</span>
                    </div>
                    {t.a ? (
                      <div className="v-reply">
                        <div className="v-avatar v-avatar--seller">M</div>
                        <div className="v-tbody">
                          <div className="v-tmeta">
                            <b>Mikalyzed Auto Boutique</b>
                            <span className="v-sellerbadge">Seller</span>
                            <span>{t.atime}</span>
                          </div>
                          <p className="v-tmsg">{t.a}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="v-pending">Awaiting seller reply</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="v-sidebar">
          <div className="v-leadcard">
            <div className="v-pricerow">
              <div className="v-price">
                <small>{v.isAuction ? "Status" : "Price"}</small>
                {priceText}
              </div>
              {monthly && (
                <div className="v-est">
                  <b>~${monthly.toLocaleString()}/mo</b>
                  est. with financing
                </div>
              )}
            </div>
            <div className="v-leadstack">
              <button type="button" className="v-btn v-btn-lime" onClick={scrollToForm}>
                Reserve This Vehicle
              </button>
              <div className="v-contactsplit">
                <a href="tel:+13057202533" className="v-btn v-btn-ghost">Call</a>
                <a href="sms:+13057202533" className="v-btn v-btn-ghost">Text</a>
              </div>
            </div>

            {submitted ? (
              <div className="v-microform v-microform--done">
                <div className="v-check">✓</div>
                <b>Thanks — we&apos;ll be in touch shortly.</b>
              </div>
            ) : (
              <form ref={formRef} className="v-microform" onSubmit={submitLead}>
                <h3>Check availability</h3>
                <input
                  type="text"
                  name="_hp"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                />
                <input ref={nameRef} type="text" name="name" placeholder="Name" required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <input type="tel" name="phone" placeholder="Phone" required value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                <label className="v-consent">
                  <input type="checkbox" name="sms_consent" />
                  <span>
                    I agree to receive SMS/text messages from Mikalyzed Auto Boutique. Msg &amp; data rates may
                    apply. Reply STOP to opt out. See our <Link href="/privacy-policy">Privacy Policy</Link> &amp;{" "}
                    <Link href="/terms-and-conditions">Terms</Link>.
                  </span>
                </label>
                <button type="submit" className="v-btn v-btn-ghost" disabled={submitting}>
                  {submitting ? "Sending…" : "Ask About This Car"}
                </button>
              </form>
            )}

            <div className="v-trustrow">
              <div className="v-trust"><b>Nationwide</b><span>Delivery</span></div>
              <div className="v-trust"><b>Financing</b><span>Available</span></div>
              <div className="v-trust"><b>Trades</b><span>Welcome</span></div>
            </div>
          </div>

          <Link href="/apply" className="v-sidemini">
            <div><b>Get pre-qualified</b><span>2 minutes, no credit impact</span></div>
            <span className="v-arr">→</span>
          </Link>
          <Link href="/sell" className="v-sidemini">
            <div><b>Have a trade?</b><span>Get a value in minutes</span></div>
            <span className="v-arr">→</span>
          </Link>

          <div className="v-sidecard">
            <h3 className="v-sideh">Documentation</h3>
            <div className="v-docs">
              {["Multi-point inspection report", "Service records", "Work performed & receipts", "Title & registration"].map((d) => (
                <a key={d} href="#" className="v-doc">
                  <span className="v-doc-ic">📄</span>
                  <span className="v-doc-name">{d}</span>
                  <span className="v-doc-arr">↓</span>
                </a>
              ))}
            </div>
            <p className="v-condnote" style={{ marginTop: 12 }}>
              Inspection reports, service records, and work receipts attach here per vehicle.
            </p>
          </div>

          <div className="v-sidecard">
            <h3 className="v-sideh">Equipment</h3>
            <div className="v-equip">
              {["Air conditioning", "Power windows", "Leather seating", "Alloy wheels", "Premium audio", "Factory manuals"].map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
            <p className="v-condnote" style={{ marginTop: 10 }}>Sample — wired to per-vehicle data before launch.</p>
          </div>
        </aside>
      </div>

      {/* SIMILAR */}
      {recommended.length > 0 && (
        <section className="v-wrap v-similar">
          <div className="v-sechead">
            <div>
              <span className="v-chip">Keep looking</span>
              <h2>
                More from the <em>showroom</em>
              </h2>
            </div>
            <Link href="/inventory" className="v-seclink">View full collection →</Link>
          </div>
          <div className="v-simgrid">
            {recommended.slice(0, 3).map((r) => (
              <Link key={r.vin} className="v-car" href={`/inventory/${r.slug}/${r.vin}`}>
                <div className="v-carimg">
                  {r.image ? (
                    <Image src={r.image} alt={r.name} fill sizes="380px" style={{ objectFit: "cover" }} />
                  ) : (
                    <span className="v-ph">VEHICLE PHOTO</span>
                  )}
                  <span className="v-carprice">{r.price}</span>
                </div>
                <div className="v-carbody">
                  <h3>{r.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MOBILE STICKY CTA */}
      <div className="v-mobilecta">
        <div className="v-mprice">
          <small>{v.year} {v.make} {v.model}</small>
          {priceText}
        </div>
        <button type="button" className="v-btn v-btn-lime" onClick={scrollToForm}>
          Reserve
        </button>
      </div>
    </div>
  );
}

const CSS = `
.v-root{
  --bg:#0B0B0A;--surface:#141412;--surface-2:#1B1B18;--lime:#C6F135;--lime-dim:rgba(198,241,53,.12);
  --white:#F5F5F0;--gray:#8A8A80;--line:rgba(245,245,240,.07);--r:22px;
  --lime-fill:#C6F135;--text-2:#CFCFC6;--input-bg:rgba(11,11,10,.5);--placeholder:#5c5c54;--nav-bg:rgba(20,20,18,.72);
  --mono:var(--hb-mono),ui-monospace,monospace;
  background:var(--bg);color:var(--white);font-family:var(--hb-poppins),-apple-system,system-ui,sans-serif;
  line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden;position:relative;min-height:100vh;
}
.v-root *{margin:0;padding:0;box-sizing:border-box}

.v-root::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.35;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")}
.v-root a{color:inherit;text-decoration:none}
.v-root :focus-visible{outline:2px solid var(--lime);outline-offset:3px}
.v-wrap{max-width:1240px;margin:0 auto;padding:0 24px;position:relative;z-index:2}
.v-chip{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--lime);background:var(--lime-dim);border:1px solid rgba(198,241,53,.25);padding:7px 14px;border-radius:100px}
.v-dot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:v-pulse 2s infinite}
@keyframes v-pulse{50%{opacity:.4}}

.v-nav{position:fixed;top:16px;left:0;right:0;z-index:100}
.v-navpill{max-width:1240px;margin:0 24px;display:flex;align-items:center;justify-content:space-between;background:rgba(20,20,18,.72);backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:100px;padding:10px 10px 10px 24px}
@media(min-width:1288px){.v-navpill{margin:0 auto}}
.v-logo{font-weight:700;font-size:15px;letter-spacing:-.01em}
.v-logo span{color:var(--lime)}
.v-navlinks{display:flex;gap:4px;font-size:13.5px;font-weight:500}
.v-navlinks a{padding:8px 14px;border-radius:100px;opacity:.7;transition:.2s}
.v-navlinks a:hover{opacity:1;background:rgba(245,245,240,.06)}
.v-navcta{background:transparent;border:1px solid rgba(245,245,240,.2);color:var(--white);font-weight:600;font-size:13px;padding:10px 20px;border-radius:100px;transition:border-color .2s,background .2s}
.v-navcta:hover{border-color:rgba(245,245,240,.45);background:rgba(245,245,240,.05)}
.v-navright{display:flex;align-items:center;gap:10px}
.v-themebtn{width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--white);font-size:15px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s}
.v-themebtn:hover{border-color:rgba(198,241,53,.4);background:rgba(198,241,53,.06)}
@media(max-width:980px){.v-navlinks{display:none}}

.v-head{padding:120px 0 24px}
.v-crumbs{font-family:var(--mono);font-size:11.5px;letter-spacing:.06em;color:var(--gray);display:flex;gap:10px;flex-wrap:wrap}
.v-crumbs a:hover{color:var(--lime)}
.v-titlerow{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:18px}
.v-h1{font-size:clamp(30px,4.2vw,52px);font-weight:600;letter-spacing:-.03em;line-height:1.05}
.v-h1 em{font-style:italic;font-weight:400;color:var(--lime)}
.v-titlemeta{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.v-tag{font-family:var(--mono);font-size:11px;letter-spacing:.08em;color:var(--gray);border:1px solid var(--line);padding:6px 13px;border-radius:100px;text-transform:uppercase}
.v-tag--lime{color:var(--lime);border-color:rgba(198,241,53,.3);background:var(--lime-dim)}

.v-gallery{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;margin-top:28px;aspect-ratio:2.8/1}
.v-g{border-radius:var(--r);overflow:hidden;position:relative;border:1px solid var(--line);background:linear-gradient(140deg,#1e1e1a,#101010);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s}
.v-g:hover{transform:scale(1.008)}
.v-gmain{grid-row:span 2}
.v-ph{font-family:var(--mono);font-size:10px;letter-spacing:.15em;color:#3a3a33}
.v-gbadge{position:absolute;top:14px;left:14px;z-index:3}
.v-goverlay{position:absolute;inset:0;background:rgba(11,11,10,.72);backdrop-filter:blur(3px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;z-index:2}
.v-goverlay b{font-size:22px;font-weight:600;color:#F5F5F0}
.v-goverlay span{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#B9B9B0}
@media(max-width:860px){.v-gallery{grid-template-columns:1fr 1fr;grid-template-rows:none;aspect-ratio:auto}.v-gmain{grid-column:span 2;grid-row:auto;aspect-ratio:4/3}.v-g:not(.v-gmain){aspect-ratio:4/3}}

.v-body{display:grid;grid-template-columns:1fr 400px;gap:32px;padding:36px 0 100px;align-items:start}
@media(max-width:1000px){.v-body{grid-template-columns:1fr}}
.v-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:32px;margin-bottom:20px}
@media(max-width:600px){.v-card{padding:24px 20px}}
.v-cardh{font-size:22px;font-weight:600;letter-spacing:-.02em;margin-bottom:20px;display:flex;align-items:center;gap:12px}
.v-cardh::after{content:'';flex:1;height:1px;background:var(--line)}
.v-dossier{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin-bottom:20px}
@media(max-width:860px){.v-dossier{grid-template-columns:repeat(2,1fr)}}
.v-fact{background:var(--surface);padding:20px 22px}
.v-fact span{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gray);margin-bottom:6px}
.v-fact b{font-size:15px;font-weight:600;letter-spacing:-.01em}
.v-fact--vin b{font-family:var(--mono);font-size:12.5px;font-weight:500;word-break:break-all}
.v-hl{list-style:none;display:grid;gap:14px}
.v-hl li{display:flex;gap:14px;font-size:15px;font-weight:300;color:#CFCFC6}
.v-hl li::before{content:'—';color:var(--lime);font-family:var(--mono);flex-shrink:0}
.v-features{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(max-width:600px){.v-features{grid-template-columns:1fr}}
.v-feat{display:flex;align-items:center;gap:12px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:rgba(245,245,240,.02);transition:border-color .2s,transform .15s}
.v-feat:hover{border-color:rgba(198,241,53,.25);transform:translateY(-1px)}
.v-feat-ic{width:26px;height:26px;border-radius:8px;background:var(--lime-dim);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.v-feat-label{font-size:14px;font-weight:500;color:var(--white);letter-spacing:-.01em}
.v-desc p{font-size:15.5px;font-weight:300;color:#CFCFC6;margin-bottom:16px}
.v-desc p:last-child{margin-bottom:0}
.v-desc strong{color:var(--white);font-weight:600}
.v-story-toggle{display:none;margin-top:16px;background:none;border:1px solid var(--line);color:var(--white);font-family:inherit;font-size:13px;font-weight:500;padding:10px 18px;border-radius:100px;cursor:pointer;align-items:center;gap:8px;transition:border-color .2s}
.v-story-toggle:hover{border-color:rgba(198,241,53,.4)}
.v-story-chev{color:var(--lime);font-size:8px}
@media(max-width:1000px){
  .v-story-toggle{display:inline-flex}
  .v-desc__p.is-clamped{display:-webkit-box;-webkit-line-clamp:6;line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}
}
.v-equip{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:560px){.v-equip{grid-template-columns:1fr}}
.v-equip span{font-size:13.5px;background:rgba(245,245,240,.04);border:1px solid var(--line);border-radius:100px;padding:10px 16px;display:flex;align-items:center;gap:9px}
.v-equip span::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--lime);flex-shrink:0}
.v-cond{display:grid;gap:12px}
.v-conditem{display:flex;gap:14px;font-size:14.5px;font-weight:300;color:#CFCFC6;background:rgba(245,245,240,.03);border:1px solid var(--line);border-radius:14px;padding:14px 18px}
.v-conditem::before{content:'○';color:var(--gray);flex-shrink:0}
.v-condnote{font-size:12.5px;color:var(--gray);font-weight:300;margin-top:14px;font-style:italic}

.v-sidebar{position:sticky;top:96px;display:grid;gap:16px}
@media(max-width:1000px){.v-sidebar{position:static}}
.v-leadcard{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:28px;position:relative;overflow:hidden}
.v-leadcard::before{content:'';position:absolute;top:-120px;right:-120px;width:380px;height:380px;background:radial-gradient(circle,rgba(198,241,53,.12),transparent 65%);pointer-events:none}
.v-pricerow{display:flex;align-items:baseline;justify-content:space-between;gap:12px;position:relative;z-index:2}
.v-price{font-size:38px;font-weight:600;letter-spacing:-.03em}
.v-price small{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--gray);display:block;font-weight:400;margin-bottom:2px}
.v-est{font-family:var(--mono);font-size:11.5px;color:var(--gray);text-align:right}
.v-est b{color:var(--white);font-weight:500;display:block;font-size:13px}
.v-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-weight:600;font-size:14.5px;padding:16px 24px;border-radius:100px;transition:transform .15s,background .2s,border-color .2s;border:1px solid transparent;width:100%;cursor:pointer;font-family:inherit;position:relative;z-index:2}
.v-btn-lime{background:var(--lime);color:#0B0B0A}
.v-btn-lime:hover{transform:scale(1.02)}
.v-btn-ghost{border-color:var(--line);background:rgba(245,245,240,.03);color:var(--white)}
.v-btn-ghost:hover{border-color:rgba(198,241,53,.4)}
.v-btn:disabled{opacity:.6;cursor:default}
.v-leadstack{display:grid;gap:10px;margin-top:22px;position:relative;z-index:2}
.v-contactsplit{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.v-microform{display:grid;gap:10px;margin-top:22px;padding-top:22px;border-top:1px solid var(--line);position:relative;z-index:2}
.v-microform h3{font-size:14.5px;font-weight:600}
.v-microform input[type=text],.v-microform input[type=tel]{width:100%;padding:13px 16px;border:1px solid var(--line);background:rgba(11,11,10,.5);border-radius:12px;font-family:inherit;font-size:13.5px;color:var(--white)}
.v-microform ::placeholder{color:#5c5c54}
.v-microform--done{text-align:center;gap:8px;place-items:center}
.v-check{width:46px;height:46px;border-radius:50%;background:var(--lime-dim);border:1px solid rgba(198,241,53,.3);color:var(--lime);display:flex;align-items:center;justify-content:center;font-size:20px}
.v-microform--done b{font-weight:500;color:#CFCFC6;font-size:13.5px}
.v-consent{display:flex;gap:9px;align-items:flex-start;font-size:10.5px;line-height:1.5;color:var(--gray);font-weight:300}
.v-consent input{width:auto;margin-top:3px}
.v-consent a{text-decoration:underline}
.v-trustrow{display:flex;justify-content:space-between;gap:8px;margin-top:18px;padding-top:18px;border-top:1px solid var(--line);position:relative;z-index:2}
.v-trust{text-align:center;flex:1}
.v-trust b{display:block;font-size:12.5px;font-weight:600}
.v-trust span{font-family:var(--mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--gray)}
.v-sidemini{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:14px;transition:border-color .2s}
.v-sidemini:hover{border-color:rgba(198,241,53,.35)}
.v-sidemini b{font-size:14.5px;font-weight:600;display:block}
.v-sidemini span{font-size:12.5px;color:var(--gray);font-weight:300}
.v-arr{color:var(--lime);font-size:18px}
.v-sidecard{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:24px}
.v-sideh{font-size:16px;font-weight:600;letter-spacing:-.01em;margin-bottom:16px}
.v-sidecard .v-equip{grid-template-columns:1fr}
.v-docs{display:grid;gap:8px}
.v-doc{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:rgba(245,245,240,.03);transition:border-color .2s,transform .15s}
.v-doc:hover{border-color:rgba(198,241,53,.35);transform:translateY(-1px)}
.v-doc-ic{font-size:15px;flex-shrink:0}
.v-doc-name{flex:1;font-size:13px;font-weight:500;min-width:0}
.v-doc-arr{color:var(--lime);font-size:13px;flex-shrink:0}

.v-similar{padding:0 24px 110px}
.v-sechead{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:32px;flex-wrap:wrap}
.v-sechead h2{font-size:clamp(26px,3.2vw,40px);font-weight:600;letter-spacing:-.03em;margin-top:14px}
.v-sechead h2 em{font-style:italic;font-weight:400;color:var(--lime)}
.v-seclink{font-size:14px;font-weight:500;border:1px solid var(--line);padding:12px 22px;border-radius:100px;transition:border-color .2s}
.v-seclink:hover{border-color:rgba(198,241,53,.4)}
.v-simgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:860px){.v-simgrid{grid-template-columns:1fr}}
.v-car{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;transition:transform .2s,border-color .2s;position:relative;display:block}
.v-car:hover{transform:translateY(-5px);border-color:rgba(198,241,53,.35)}
.v-carimg{aspect-ratio:4/3;background:linear-gradient(140deg,#1e1e1a,#101010);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.v-carprice{position:absolute;top:14px;right:14px;background:var(--lime);color:#0B0B0A;font-family:var(--mono);font-size:13px;font-weight:500;padding:8px 14px;border-radius:100px;z-index:2}
.v-carbody{padding:20px}
.v-carbody h3{font-weight:600;font-size:16.5px;letter-spacing:-.01em}

.v-mobilecta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(20,20,18,.85);backdrop-filter:blur(18px);border-top:1px solid var(--line);padding:12px 16px calc(12px + env(safe-area-inset-bottom));grid-template-columns:auto 1fr;gap:12px;align-items:center}
.v-mprice{font-size:19px;font-weight:600;letter-spacing:-.02em}
.v-mprice small{display:block;font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--gray);font-weight:400}
.v-mobilecta .v-btn{padding:14px 20px}
@media(max-width:1000px){.v-mobilecta{display:grid}}

/* Q&A */
.v-qcount{font-family:var(--mono);font-size:12.5px;color:var(--lime);background:var(--lime-dim);border:1px solid rgba(198,241,53,.25);padding:2px 11px;border-radius:100px;font-weight:500}
.v-qa-gate{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:rgba(198,241,53,.05);border:1px solid rgba(198,241,53,.2);border-radius:16px;padding:18px 20px;margin-bottom:30px}
.v-qa-gatebox{display:flex;align-items:center;gap:14px}
.v-qa-lock{width:40px;height:40px;border-radius:12px;background:var(--lime-dim);border:1px solid rgba(198,241,53,.25);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.v-qa-gatebox b{display:block;font-size:14.5px;font-weight:600}
.v-qa-gatebox span{font-size:13px;color:var(--gray);font-weight:300}
.v-threads{display:grid;gap:26px}
.v-thread{display:flex;gap:14px}
.v-avatar{width:40px;height:40px;border-radius:50%;background:var(--surface-2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0;font-family:var(--mono)}
.v-avatar--seller{background:var(--lime);color:#0B0B0A;border-color:var(--lime)}
.v-tbody{flex:1;min-width:0}
.v-tmeta{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.v-tmeta b{font-size:14px;font-weight:600}
.v-tmeta>span{font-family:var(--mono);font-size:11px;color:var(--gray)}
.v-sellerbadge{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--lime);background:var(--lime-dim);border:1px solid rgba(198,241,53,.3);padding:2px 8px;border-radius:100px}
.v-tmsg{font-size:14.5px;font-weight:300;color:#CFCFC6;margin-top:6px;line-height:1.55}
.v-tactions{margin-top:8px}
.v-up{font-family:var(--mono);font-size:11px;color:var(--gray);border:1px solid var(--line);border-radius:100px;padding:4px 12px;cursor:pointer;transition:.2s}
.v-up:hover{color:var(--lime);border-color:rgba(198,241,53,.3)}
.v-reply{display:flex;gap:12px;margin-top:16px;padding-left:16px;border-left:2px solid rgba(198,241,53,.3)}
.v-reply .v-avatar{width:34px;height:34px;font-size:12px}
.v-pending{margin-top:10px;font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--gray)}
`;

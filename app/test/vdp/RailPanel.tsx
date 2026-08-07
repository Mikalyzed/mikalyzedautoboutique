"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE, PHONE_HREF } from "../components/Chrome";

/**
 * The conversion rail. One primary action, Make Offer directly under it, and
 * contact demoted to a quiet text link — §7.6 of the build spec.
 *
 * Submitting is deliberately inert on the preview: the live root layout loads
 * GA4 and the Meta pixel here too, so a working form would manufacture real
 * leads and conversions out of preview traffic. Validation still runs so the
 * offer floor can be seen working.
 */
export default function RailPanel({
  price,
  askingNumber,
}: {
  price: string;
  askingNumber: number | null;
}) {
  const [offerMode, setOfferMode] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [offer, setOffer] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const floor = askingNumber ? Math.round(askingNumber * 0.75) : null;

  useEffect(() => {
    if (!contactOpen) return;
    const close = () => setContactOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [contactOpen]);

  function focusForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function startOffer() {
    setOfferMode(true);
    setErr(null);
    focusForm();
  }

  function submit() {
    if (!name.trim() || !phone.trim()) {
      setErr("Name and phone are required.");
      return;
    }
    if (offerMode) {
      const amt = parseInt(offer.replace(/[^0-9]/g, ""), 10);
      if (!amt) {
        setErr("Enter an offer amount.");
        return;
      }
      if (floor && amt < floor) {
        setErr(
          `That's below our floor — offers within 25% of asking only ($${floor.toLocaleString()}+).`
        );
        return;
      }
    }
    setErr(null);
    setSent(true);
  }

  return (
    <div className="railStick">
      <div className="priceCard">
        <div className="avail">
          <i />
          Available · Miami, FL
        </div>
        <div className="priceBig">{price}</div>
        {askingNumber && (
          <div className="priceMo">
            <b>~${Math.round((askingNumber / 72) * 1.12).toLocaleString()}/mo</b> est. with financing
          </div>
        )}
        <button className="railCta" onClick={focusForm}>
          Reserve this vehicle
        </button>
        <button className="railGhost" onClick={startOffer}>
          Make offer
        </button>
        <div className={`contactDrop${contactOpen ? " open" : ""}`}>
          <button
            className="cdText"
            onClick={(e) => {
              e.stopPropagation();
              setContactOpen((o) => !o);
            }}
          >
            Contact us <span className="chev">⌄</span>
          </button>
          <div className="cdPanel">
            <a href={PHONE_HREF}>
              <b>Call</b>
              <small>{PHONE}</small>
            </a>
            <a href="mailto:info@mikalyzedautoboutique.com">
              <b>Email</b>
              <small>info@mikalyzedautoboutique.com</small>
            </a>
            <a
              href="https://maps.google.com/?q=3455+NW+30th+Ave,+Miami,+FL+33142"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Visit</b>
              <small>3455 NW 30th Ave, Miami, FL 33142</small>
            </a>
          </div>
        </div>
      </div>

      <div className="finCard">
        <span>
          <b>Get pre-approved</b>
          <small>Financing · 2 min · No credit impact</small>
        </span>
        <span className="ar">→</span>
      </div>

      <div className="formCard" ref={formRef} style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
        {sent ? (
          <div className="formOk">
            <div className="okIc">✓</div>
            <div className="t">Nothing was sent — this is the preview.</div>
            <div className="s">On the live site this would reach the team.</div>
          </div>
        ) : (
          <>
            <div className="fcT">{offerMode ? "Make an offer" : "Questions about this car?"}</div>
            <div style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: "1.2rem" }}>
              {offerMode
                ? "Serious offers move fast — we respond to every one."
                : "Ask anything — we reply to every message."}
            </div>
            <div className="field">
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            {offerMode && (
              <>
                <div className="field">
                  <input
                    inputMode="numeric"
                    placeholder={`Your offer (asking ${price})`}
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                </div>
                <div className={`offerNote${err ? " err" : ""}`}>
                  {err ?? "We consider offers within 25% of asking."}
                </div>
              </>
            )}
            <div className="field">
              <textarea rows={3} placeholder="Anything specific? (optional)" />
            </div>
            {err && !offerMode && <div className="offerNote err">{err}</div>}
            <div className="consent">
              I agree to receive SMS/text messages from Mikalyzed Auto Boutique. Msg &amp; data rates
              may apply. Reply STOP to opt out.
            </div>
            <button className="ctaDark" onClick={submit}>
              {offerMode ? "Send offer" : "Ask about this car"}
            </button>
          </>
        )}
      </div>

      <div className="trust">
        <span>Nationwide delivery</span>
        <span>Financing available</span>
        <span>Trades welcome</span>
      </div>

      <div className="miniLink">
        <span>
          <b>Have a trade?</b>
          <small>GET A VALUE IN MINUTES</small>
        </span>
        <span className="ar">→</span>
      </div>
    </div>
  );
}

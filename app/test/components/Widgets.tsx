"use client";

import { useEffect, useRef, useState } from "react";

/** Animates an integer when it scrolls into view. Static under reduced motion. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The reduced-motion branch lives inside the observer callback rather than
    // the effect body: setting state synchronously while the effect runs
    // triggers a cascading render.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setN(to);
          return;
        }
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const k = Math.min((t - t0) / dur, 1);
          setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{n}</span>;
}

type Item = { title: string; body: string };

/** One open at a time, "+" rotates to "×" in accent — §4 of the build spec. */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="acc">
      {items.map((it, i) => (
        <div key={it.title} className={`accIt${open === i ? " open" : ""}`}>
          <button
            className="accH"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="i">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{it.title}</span>
            <span className="ch">+</span>
          </button>
          <div className="accB">
            <p>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const SERVICES = [
  { v: "Buy a car", s: "Browse the collection" },
  { v: "Sell your car", s: "Free appraisal" },
  { v: "Source a vehicle", s: "We hunt it down" },
  { v: "The Reserve", s: "Private storage" },
];

/**
 * The contact form, deliberately inert.
 *
 * The live root layout loads GA4 and the Meta pixel on every route including
 * this one, so a working form here would create real leads and fire real
 * conversion events off preview traffic. It renders and validates exactly like
 * the real thing, then stops.
 */
export function InertForm() {
  const [choice, setChoice] = useState("");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  if (sent) {
    return (
      <div className="formCard formOk">
        <div className="okIc">✓</div>
        <div className="t">Nothing was sent — this is the preview.</div>
        <div className="s">On the live site this would text you back.</div>
      </div>
    );
  }

  return (
    <div className="formCard">
      <div className="fcT">Tell us what you need</div>
      <div className="field">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={touched && !name.trim() ? { borderColor: "var(--accent)" } : undefined}
        />
      </div>
      <div className="field">
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={touched && !phone.trim() ? { borderColor: "var(--accent)" } : undefined}
        />
      </div>

      <div className={`field lux${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="luxBtn"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`val${choice ? "" : " empty"}`}>{choice || "What do you need?"}</span>
          <span className="chev">⌄</span>
        </button>
        <div className="luxPanel" role="listbox">
          {SERVICES.map((o) => (
            <button
              key={o.v}
              type="button"
              role="option"
              aria-selected={choice === o.v}
              className={`luxOpt${choice === o.v ? " sel" : ""}`}
              onClick={() => {
                setChoice(o.v);
                setOpen(false);
              }}
            >
              <span>
                <span className="l">{o.v}</span>
                <span className="s">{o.s}</span>
              </span>
              <span className="mk">◆</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <textarea rows={3} placeholder="Year, model, spec, colors — the more detail the better" />
      </div>
      <div className="consent">
        I agree to receive SMS/text messages from Mikalyzed Auto Boutique. Msg &amp; data rates may
        apply. Reply STOP to opt out. See our Privacy Policy &amp; Terms.
      </div>
      <button
        className="cta"
        style={{ display: "block", width: "100%" }}
        onClick={() => {
          setTouched(true);
          if (name.trim() && phone.trim()) setSent(true);
        }}
      >
        Send it
      </button>
    </div>
  );
}

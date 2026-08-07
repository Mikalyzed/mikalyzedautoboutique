"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Vehicle } from "@/lib/parseInventory";
import { displayImages, miles, priceLabel, priceNumber, vdpHref, vehicleName } from "../lib";

type Sort = "p-desc" | "p-asc" | "y-desc" | "y-asc" | "m-asc" | "m-desc";

const SORTS: { v: Sort; label: string }[] = [
  { v: "p-desc", label: "Price · High to Low" },
  { v: "p-asc", label: "Price · Low to High" },
  { v: "y-desc", label: "Year · Newest" },
  { v: "y-asc", label: "Year · Oldest" },
  { v: "m-asc", label: "Mileage · Low to High" },
  { v: "m-desc", label: "Mileage · High to Low" },
];

export default function InventoryClient({ vehicles }: { vehicles: Vehicle[] }) {
  const [q, setQ] = useState("");
  const [make, setMake] = useState("");
  const [trans, setTrans] = useState("");
  const [sort, setSort] = useState<Sort>("p-desc");

  const makes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make).filter(Boolean))].sort(),
    [vehicles]
  );
  const transmissions = useMemo(
    () => [...new Set(vehicles.map((v) => v.transmission).filter(Boolean) as string[])].sort(),
    [vehicles]
  );

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = vehicles.filter((v) => {
      const hay = `${v.year} ${v.make} ${v.model} ${v.trim ?? ""}`.toLowerCase();
      return (
        (!needle || hay.includes(needle)) &&
        (!make || v.make === make) &&
        (!trans || v.transmission === trans)
      );
    });

    // Vehicles priced "Call" have no number; park them at the end of price
    // sorts rather than letting them masquerade as $0.
    const p = (v: Vehicle) => priceNumber(v);
    const m = (v: Vehicle) => v.odometer;

    out.sort((a, b) => {
      switch (sort) {
        case "p-desc":
          return (p(b) ?? -1) - (p(a) ?? -1);
        case "p-asc":
          return (p(a) ?? Infinity) - (p(b) ?? Infinity);
        case "y-desc":
          return b.year - a.year;
        case "y-asc":
          return a.year - b.year;
        case "m-asc":
          return (m(a) ?? Infinity) - (m(b) ?? Infinity);
        case "m-desc":
          return (m(b) ?? -1) - (m(a) ?? -1);
      }
    });
    return out;
  }, [vehicles, q, make, trans, sort]);

  function clear() {
    setQ("");
    setMake("");
    setTrans("");
  }

  return (
    <>
      <div className="toolbar">
        <div className="tbInner">
          <div className="search">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search the collection…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="selwrap">
            <select className="sel" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="selwrap">
            <select className="sel" value={make} onChange={(e) => setMake(e.target.value)}>
              <option value="">All Makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          {transmissions.length > 0 && (
            <div className="selwrap">
              <select className="sel" value={trans} onChange={(e) => setTrans(e.target.value)}>
                <option value="">All Transmissions</option>
                {transmissions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="tbCount">
            Showing <b>{list.length}</b> of {vehicles.length}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="gridZone">
          <div className="vgrid">
            {list.length === 0 && (
              <div className="emptyState">
                <div className="t">Nothing matches that.</div>
                <div className="s">
                  Loosen the filters or start a sourcing request — we&apos;ll hunt it down.
                </div>
                <button onClick={clear}>Clear filters</button>
              </div>
            )}

            {list.map((v) => {
              const imgs = displayImages(v);
              return (
                <Link className="vcard rvl in" href={vdpHref(v)} key={v.vin}>
                  <div className="vImg">
                    {imgs[0] && (
                      <Image
                        src={imgs[0]}
                        alt={`${v.year} ${vehicleName(v)}`}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1100px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <span className="vChip">{imgs.length} PHOTOS</span>
                  </div>
                  <div className="vBody">
                    <div className="vYear">
                      {v.year} · {v.make.toUpperCase()}
                    </div>
                    <div className="vName">{v.model}</div>
                    <div className="vPrice">{priceLabel(v)}</div>
                    <div className="vMeta">
                      <span>{miles(v)}</span>
                      {v.transmission && <span className="tr">{v.transmission}</span>}
                      <span className="go">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

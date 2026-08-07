import Link from "next/link";
import "../home.css";
import "./inventory.css";
import { getAvailableVehicles } from "@/lib/vehicles";
import { Nav, Footer } from "../components/Chrome";
import InventoryClient from "./InventoryClient";

export const dynamic = "force-dynamic";

export default async function TestInventory() {
  const all = await getAvailableVehicles();
  const vehicles = all.filter((v) => !v.hidden);

  return (
    <>
      <Nav active="/test/inventory" />

      <div className="wrap">
        <div className="pageHead">
          <div>
            <div className="heroEyebrow">
              <span className="dot" />
              The Collection · Allapattah, Miami
            </div>
            <h1>
              Inven<span className="thin">tory</span>
            </h1>
            <div className="pageSub">
              Classics, exotics, and customs — <b>{vehicles.length} vehicles</b>, every one
              photographed, documented, and ready to move.
            </div>
          </div>
          <div className="countChip">{vehicles.length} VEHICLES</div>
        </div>
      </div>

      <InventoryClient vehicles={vehicles} />

      <div className="wrap">
        <div className="band">
          <div>
            <h3>Don&apos;t see it? We&apos;ll source it.</h3>
            <p>
              Tell us the year, spec, and colors you&apos;re hunting — we find cars for clients every
              week.
            </p>
          </div>
          <div className="bandCta">
            <Link className="cta" href="/test#contact">
              Start a search
            </Link>
            <Link className="ctaGhost" href="/test#contact">
              Sell your car
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

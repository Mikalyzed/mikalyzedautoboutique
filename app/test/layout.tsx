import type { Metadata } from "next";
import "./volt.css";
import { fontVars } from "./fonts";
import Reveal from "./components/Reveal";

export const metadata: Metadata = {
  title: "Volt V3 Preview — Mikalyzed Auto Boutique",
  // Preview only. These must never be indexed while the live pages exist.
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`volt ${fontVars}`} style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
      <div className="testFlag">
        Volt V3 preview · not the live site · nothing here writes to leads or analytics
      </div>
      {children}
      <Reveal />
    </div>
  );
}

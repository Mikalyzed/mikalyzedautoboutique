"use client";

export default function PrintButton() {
  return (
    <button className="ctaGlass acc" onClick={() => window.print()}>
      Save as PDF<span className="ar">→</span>
    </button>
  );
}

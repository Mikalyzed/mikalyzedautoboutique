"use client";

import { useState } from "react";

export default function Story({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  // ~200wpm, rounded up — the mockup's "2 min read" made concrete.
  const words = paragraphs.join(" ").split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));

  return (
    <div className={`story${open ? " open" : ""}`}>
      <button className="storyToggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="storyPlus">+</span>
        <span className="t">The Full Story</span>
        <span className="rt">
          {mins} min read
        </span>
      </button>
      <div className="storyBody">
        <div className="storyInner">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

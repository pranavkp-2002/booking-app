"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";

/** Save / Saved toggle for a place. Local only until a saved-places API exists. */
export default function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => setSaved((s) => !s)}
      className={buttonClass({ variant: saved ? "outline-accent" : "outline", className: "flex-none" })}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {saved ? "Saved" : "Save"}
    </button>
  );
}

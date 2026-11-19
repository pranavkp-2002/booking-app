"use client";

import { useRef } from "react";
import { focusRing } from "@/components/ui";

/**
 * Pill-style tab switcher (Upcoming / Past / Cancelled).
 * options: [{ value, label }]; value/onChange are controlled.
 * Pass `panelId` so each tab points at the panel it controls.
 */
export default function SegmentedTabs({ options, value, onChange, label, panelId }) {
  const listRef = useRef(null);

  // Arrow keys move between tabs, as screen-reader users expect from a tablist.
  const onKeyDown = (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = options.findIndex((o) => o.value === value);
    const next = options[(i + step + options.length) % options.length];
    onChange(next.value);
    listRef.current?.querySelector(`[data-value="${next.value}"]`)?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex gap-1 rounded-xl bg-[#E8EBEF] p-1"
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            data-value={o.value}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={`min-h-10 cursor-pointer rounded-[9px] px-4 text-sm font-medium transition-colors ${
              selected ? "bg-white font-semibold text-ink shadow-[0_1px_2px_rgba(18,21,26,0.08)]" : "text-ink-2 hover:text-ink"
            } ${focusRing}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

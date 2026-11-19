"use client";

import { focusRing } from "@/components/ui";

/**
 * Single-select row of toggle chips.
 * options: [{ value, label }]; value/onChange are controlled.
 */
export default function ChipGroup({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 min-[861px]:mx-0 min-[861px]:flex-wrap min-[861px]:px-0">
      {options.map((o) => {
        const pressed = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(o.value)}
            className={`flex min-h-10 flex-none cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
              pressed ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink-2"
            } ${focusRing}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

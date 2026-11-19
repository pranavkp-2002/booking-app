"use client";

import { focusRing } from "@/components/ui";

/** slots: [{ label, open }]. `value` is the selected label. */
export default function SlotGrid({ slots, value, onChange }) {
  if (!slots.some((s) => s.open)) {
    return <p className="rounded-xl bg-surface-2 px-4 py-6 text-center text-sm text-muted">No free slots this day. Try another day.</p>;
  }
  return (
    <div role="group" aria-label="Time" className="grid grid-cols-3 gap-2 min-[600px]:grid-cols-4 min-[961px]:grid-cols-5">
      {slots.map(({ label, open }) => {
        const selected = label === value;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            disabled={!open}
            onClick={() => onChange(label)}
            className={`min-h-11 cursor-pointer rounded-[10px] border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-2 disabled:font-medium disabled:text-faint disabled:line-through ${
              selected ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:border-brand"
            } ${focusRing}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

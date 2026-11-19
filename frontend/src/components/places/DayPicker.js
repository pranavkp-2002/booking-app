"use client";

import { headingFont } from "@/components/fonts";
import { focusRing } from "@/components/ui";
import { dayLong, dayShort } from "./schedule";

/** Row of 7 day tiles. `days` are Date objects; `value` is the selected index. */
export default function DayPicker({ days, value, onChange }) {
  return (
    <div role="group" aria-label="Day" className="grid grid-cols-7 gap-1.5 min-[600px]:gap-2">
      {days.map((d, i) => {
        const selected = i === value;
        return (
          <button
            key={d.toDateString()}
            type="button"
            aria-pressed={selected}
            aria-label={dayLong(d)}
            onClick={() => onChange(i)}
            className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl border transition-colors ${
              selected ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-line-strong"
            } ${focusRing}`}
          >
            <small className={`text-xs font-medium ${selected ? "text-white/80" : "text-muted"}`}>{dayShort(d)}</small>
            <strong className={`${headingFont} text-lg leading-none`}>{d.getDate()}</strong>
          </button>
        );
      })}
    </div>
  );
}

export function DayPickerSkeleton() {
  return (
    <div className="grid grid-cols-7 gap-1.5 min-[600px]:gap-2" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="min-h-16 animate-pulse rounded-xl bg-surface" />
      ))}
    </div>
  );
}

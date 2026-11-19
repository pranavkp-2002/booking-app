// Slotly UI primitives. No hooks here, so they work in Server and Client Components.
// Interactive pieces (ChipGroup) live in their own "use client" files.
import Link from "next/link";
import { headingFont } from "@/components/fonts";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const cx = (...c) => c.filter(Boolean).join(" ");

/* ---------- Layout ---------- */

export function Container({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-[1200px] px-4 min-[861px]:px-6", className)}>{children}</div>;
}

export function Stack({ gap = "gap-4", className, children, as: Tag = "div", ...props }) {
  return (
    <Tag className={cx("flex flex-col", gap, className)} {...props}>
      {children}
    </Tag>
  );
}

export function SectionTitle({ as: Tag = "h2", className, children, ...props }) {
  return (
    <Tag className={cx(headingFont, "text-xl font-semibold text-ink min-[861px]:text-[22px]", className)} {...props}>
      {children}
    </Tag>
  );
}

/* ---------- Buttons ---------- */

const BUTTON_VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-line-strong bg-white text-ink hover:bg-surface",
  ghost: "text-ink hover:bg-surface",
  dark: "bg-ink text-white hover:bg-[#2A2F38]",
  danger: "border border-[#F1C4BF] bg-white text-danger hover:bg-[#FEF3F2]",
  "outline-accent": "border border-brand bg-white text-brand hover:bg-brand-soft",
};

export function buttonClass({ variant = "primary", className } = {}) {
  return cx(
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    BUTTON_VARIANTS[variant],
    focusRing,
    className,
  );
}

/** Renders a <Link> when given href, otherwise a <button>. */
export function Button({ href, variant, className, children, ...props }) {
  const cls = buttonClass({ variant, className });
  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}

/* ---------- Pills, alerts, avatars ---------- */

const PILL_TONES = {
  green: "bg-success-soft text-success",
  grey: "bg-surface text-ink-2",
  brand: "bg-brand-soft text-brand",
  amber: "bg-[#FDF0D5] text-[#93370D]",
  red: "bg-[#FEE4E2] text-danger",
};

export function Pill({ tone = "grey", className, children }) {
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap", PILL_TONES[tone], className)}>
      {children}
    </span>
  );
}

const ALERT_TONES = {
  green: "border-transparent bg-[#DDF0EA] text-[#0A5E51]",
  grey: "border-line bg-surface-2 text-ink-2",
};

export function Alert({ tone = "grey", className, children, ...props }) {
  return (
    <div
      className={cx("flex flex-col gap-3 rounded-2xl border p-4 min-[600px]:flex-row min-[600px]:items-center min-[600px]:gap-4 min-[600px]:px-5", ALERT_TONES[tone], className)}
      {...props}
    >
      {children}
    </div>
  );
}

const AVATAR_SIZES = { sm: "h-7 w-7 text-xs", md: "h-8 w-8 text-sm", lg: "h-[52px] w-[52px] text-xl" };

export function Avatar({ name, size = "md" }) {
  const dim = AVATAR_SIZES[size] ?? AVATAR_SIZES.md;
  return (
    <span aria-hidden="true" className={cx("flex flex-none items-center justify-center rounded-full bg-brand-soft font-bold text-brand", dim)}>
      {name?.[0]?.toUpperCase() ?? "?"}
    </span>
  );
}

/* ---------- Cards ---------- */

export function Card({ as: Tag = "div", pad = true, className, children, ...props }) {
  return (
    <Tag className={cx("rounded-2xl border border-line bg-white", pad && "p-5", className)} {...props}>
      {children}
    </Tag>
  );
}

/* ---------- Form controls ---------- */

export const inputClass = cx(
  "h-11 w-full rounded-[10px] border border-line-strong bg-white px-3.5 text-[15px] text-ink placeholder:text-faint",
  focusRing,
);

export function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="text-[13px] text-danger">{error}</span>}
    </label>
  );
}

export function Input({ className, ...props }) {
  return <input className={cx(inputClass, className)} {...props} />;
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cx("flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink", className)}>
      <input type="checkbox" className="h-5 w-5 flex-none cursor-pointer accent-brand" {...props} />
      {label}
    </label>
  );
}

export const selectClass = cx(
  "h-10 cursor-pointer rounded-[10px] border border-line-strong bg-white px-3 text-sm text-ink",
  focusRing,
);

export function Select({ className, children, ...props }) {
  return (
    <select className={cx(selectClass, className)} {...props}>
      {children}
    </select>
  );
}

/* ---------- Lists ---------- */

/**
 * Generic list. Renders `items` through `renderItem`, or `empty` when there are none.
 * layout: "grid" (responsive card grid) | "cards" (one card per row) | "stack" (rows in one bordered box).
 */
export function List({ items, renderItem, getKey = (it) => it.id, layout = "stack", empty, className, ...props }) {
  if (!items.length) return empty ?? null;
  const layoutCls = {
    grid: "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1140px]:grid-cols-4 min-[861px]:gap-5",
    cards: "flex flex-col gap-4",
    stack: "flex flex-col divide-y divide-line rounded-2xl border border-line bg-white",
  }[layout];
  return (
    <ul className={cx("m-0 list-none p-0", layoutCls, className)} {...props}>
      {items.map((it, i) => (
        <li key={getKey(it, i)} className={layout === "grid" ? "flex" : undefined}>
          {renderItem(it, i)}
        </li>
      ))}
    </ul>
  );
}

/** One row of a stack List: leading visual, title/subtitle, trailing slot. */
export function ListItem({ leading, title, subtitle, trailing, href }) {
  const body = (
    <>
      {leading}
      <span className="flex min-w-0 flex-auto flex-col gap-0.5">
        <span className="truncate text-[15px] font-semibold text-ink">{title}</span>
        {subtitle && <span className="truncate text-[13px] text-muted">{subtitle}</span>}
      </span>
      {trailing && <span className="flex-none">{trailing}</span>}
    </>
  );
  const cls = "flex min-h-16 items-center gap-3 px-4 py-3";
  return href ? (
    <Link href={href} className={cx(cls, "hover:bg-surface-2", focusRing)}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function EmptyState({ children }) {
  return <p className="rounded-2xl border border-dashed border-line-strong px-4 py-10 text-center text-[15px] text-muted">{children}</p>;
}

/* ---------- Selection ---------- */

/**
 * Selectable row with a title, subtitle, trailing text and a tick (multi-select option).
 * Controlled: pass `selected` and `onClick`.
 */
export function ToggleOption({ title, subtitle, trailing, selected, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cx(
        "flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
        selected ? "border-brand bg-brand-soft" : "border-line bg-white hover:border-line-strong",
        focusRing,
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-auto flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-ink">{title}</span>
        {subtitle && <span className="text-[13px] text-muted">{subtitle}</span>}
      </span>
      {trailing && <span className="flex-none text-[15px] font-semibold text-ink">{trailing}</span>}
      <span
        aria-hidden="true"
        className={cx(
          "flex h-[22px] w-[22px] flex-none items-center justify-center rounded-md border-2",
          selected ? "border-brand bg-brand" : "border-line-strong bg-white",
        )}
      >
        {selected && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
    </button>
  );
}

/* ---------- Navigation ---------- */

export function BackLink({ href, children }) {
  return (
    <Link href={href} className={cx("inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-ink hover:text-brand", focusRing)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="m15 6-6 6 6 6" />
      </svg>
      {children}
    </Link>
  );
}

export function Divider({ className }) {
  return <hr className={cx("h-px border-0 bg-line", className)} />;
}

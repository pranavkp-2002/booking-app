import Link from "next/link";
import { headingFont } from "@/components/fonts";
import { Pill, focusRing } from "@/components/ui";

export const COVERS = {
  teal: "bg-[#D7EFE9] text-[#0E7C6B]",
  blue: "bg-[#DCE8FB] text-[#1D4ED8]",
  amber: "bg-[#FCEBD0] text-[#B45309]",
  pink: "bg-[#FBDDEA] text-[#BE185D]",
  purple: "bg-[#E9E0FB] text-[#6D28D9]",
  grey: "bg-[#E6E9EE] text-[#3A404C]",
};

const inr = new Intl.NumberFormat("en-IN");

/** Card for a salon/clinic. Becomes a link when `href` is given. */
export default function PlaceCard({ place, href }) {
  const body = (
    <>
      <div
        aria-hidden="true"
        className={`${headingFont} flex h-36 items-center justify-center text-5xl font-bold ${COVERS[place.cover] ?? COVERS.grey}`}
      >
        {place.name[0]}
      </div>
      <div className="flex flex-auto flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-3 text-base font-semibold text-ink">
          <span>{place.name}</span>
          <span className="flex-none" aria-label={`Rated ${place.rating} out of 5`}>
            {place.rating} ★
          </span>
        </div>
        <span className="text-sm text-muted">
          {place.type} · {place.area} · {place.km.toFixed(1)} km
        </span>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-sm font-semibold text-ink">From ₹{inr.format(place.price)}</span>
          <Pill tone="green">{place.nextSlot}</Pill>
        </div>
      </div>
    </>
  );

  const cls =
    "flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left transition-shadow";
  return href ? (
    <Link href={href} className={`${cls} hover:shadow-[0_8px_24px_rgba(18,21,26,0.08)] ${focusRing}`}>
      {body}
    </Link>
  ) : (
    <article className={cls}>{body}</article>
  );
}

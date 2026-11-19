import { headingFont } from "@/components/fonts";
import { Card, Divider, buttonClass } from "@/components/ui";

const GST_RATE = 0.18;
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

/** Right-hand summary: selected services, tax, total and the confirm button. */
export default function BookingSummary({ when, services, canConfirm, pending, onConfirm }) {
  const subtotal = services.reduce((sum, s) => sum + s.price, 0);
  const tax = Math.round(subtotal * GST_RATE);

  return (
    <Card as="aside" aria-label="Booking summary" className="flex flex-col gap-3.5 min-[961px]:sticky min-[961px]:top-24">
      <h2 className={`${headingFont} text-xl font-semibold text-ink`}>Your booking</h2>
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-muted">When</span>
        <strong className="text-ink">{when}</strong>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 text-sm" aria-live="polite">
        {services.length ? (
          services.map((s) => (
            <div key={s.id} className="flex justify-between gap-3 text-ink">
              <span>{s.name}</span>
              <span>{inr(s.price)}</span>
            </div>
          ))
        ) : (
          <span className="text-muted">Pick at least one service</span>
        )}
      </div>
      <div className="flex justify-between text-sm text-muted">
        <span>GST (18%)</span>
        <span>{inr(tax)}</span>
      </div>
      <div className="flex justify-between text-[17px] font-bold text-ink">
        <span>Total</span>
        <span>{inr(subtotal + tax)}</span>
      </div>
      <button
        type="button"
        onClick={onConfirm}
        disabled={!canConfirm || pending}
        className={buttonClass({ className: "min-h-[52px] w-full text-[15px]" })}
      >
        {pending ? "Booking…" : "Confirm booking"}
      </button>
      <span className="text-[13px] leading-normal text-muted">Pay at the venue. Free cancellation up to 4 hours before.</span>
    </Card>
  );
}

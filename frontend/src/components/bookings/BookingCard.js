import { headingFont } from "@/components/fonts";
import { Button, Card, Pill } from "@/components/ui";

const STATUS = {
  confirmed: { label: "Confirmed", tone: "green" },
  pending: { label: "Pending", tone: "amber" },
  completed: { label: "Completed", tone: "grey" },
  cancelled: { label: "Cancelled", tone: "red" },
};

const inr = new Intl.NumberFormat("en-IN");

/** Month + day tile. `date` is an ISO date string (YYYY-MM-DD). */
export function DateBox({ date }) {
  const d = new Date(`${date}T00:00:00`);
  const month = d.toLocaleString("en-IN", { month: "short" });
  return (
    <div className="flex h-16 w-16 flex-none flex-col items-center justify-center rounded-xl bg-surface">
      <small className="text-xs font-semibold text-ink-2 uppercase">{month}</small>
      <strong className={`${headingFont} text-2xl leading-none font-bold text-ink`}>{d.getDate()}</strong>
    </div>
  );
}

export default function BookingCard({ booking, onCancel }) {
  const { placeId, service, place, staff, date, day, time, duration, price, status } = booking;
  const placeHref = `/places/${placeId}`;
  const s = STATUS[status] ?? STATUS.pending;
  const active = status === "confirmed" || status === "pending";
  const details = [day, time, duration, price != null && `₹${inr.format(price)}`].filter(Boolean).join(" · ");

  return (
    <Card as="article" className="flex flex-wrap items-center gap-4">
      <DateBox date={date} />
      <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <strong className="text-base text-ink">{service}</strong>
          <Pill tone={s.tone}>{s.label}</Pill>
        </div>
        <span className="text-sm text-muted">
          {place} · {staff}
        </span>
        <span className="text-sm text-muted">{details}</span>
      </div>
      {active ? (
        <div className="flex gap-2">
          <Button href={placeHref} variant="outline">
            Reschedule
          </Button>
          <Button variant="danger" onClick={() => onCancel(booking)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button href={placeHref} variant="outline-accent">
          Book again
        </Button>
      )}
    </Card>
  );
}

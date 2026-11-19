"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { headingFont } from "@/components/fonts";
import { Alert, EmptyState, List } from "@/components/ui";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import { BOOKING_TABS, tabFor } from "@/data/bookings";
import BookingCard from "./BookingCard";

const EMPTY_TEXT = {
  upcoming: "No upcoming bookings. Find a place on Explore.",
  past: "No past bookings yet.",
  cancelled: "Nothing cancelled.",
};

export default function BookingList({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [tab, setTab] = useState("upcoming");
  const [notice, setNotice] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const justBooked = params.get("booked");

  const shown = bookings.filter((b) => tabFor(b.status) === tab);

  const cancel = (booking) => {
    if (!window.confirm(`Cancel ${booking.service} at ${booking.place}?`)) return;
    // TODO: call the cancel-booking API once it exists.
    setBookings((all) => all.map((b) => (b.id === booking.id ? { ...b, status: "cancelled" } : b)));
    setNotice("Booking cancelled.");
  };

  return (
    <section className="flex min-w-0 flex-col gap-4" aria-labelledby="bookings-title">
      {justBooked && (
        <Alert tone="green" role="status">
          <span className="flex flex-auto items-center gap-3">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </span>
            <span className="text-ink">
              <strong>Booking confirmed.</strong> A confirmation has been sent to your phone and email.
            </span>
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => router.replace("/my-bookings", { scroll: false })}
            className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center self-end rounded-full text-ink-2 hover:bg-white/60 min-[600px]:self-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </Alert>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 id="bookings-title" className={`${headingFont} text-[26px] font-semibold text-ink min-[861px]:text-[30px]`}>
          My bookings
        </h1>
        <SegmentedTabs label="Booking status" options={BOOKING_TABS} value={tab} onChange={setTab} panelId="booking-panel" />
      </div>

      <p role="status" className="sr-only">
        {notice}
      </p>

      <div id="booking-panel" role="tabpanel" aria-label={BOOKING_TABS.find((t) => t.value === tab).label}>
        <List
          layout="cards"
          items={shown}
          renderItem={(b) => <BookingCard booking={b} onCancel={cancel} />}
          empty={<EmptyState>{EMPTY_TEXT[tab]}</EmptyState>}
        />
      </div>
    </section>
  );
}

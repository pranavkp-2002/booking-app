"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { headingFont } from "@/components/fonts";
import { Card, ToggleOption } from "@/components/ui";
import BrowserOnly from "@/components/ui/BrowserOnly";
import ChipGroup from "@/components/ui/ChipGroup";
import { SLOT_TIMES } from "@/data/places";
import BookingSummary from "./BookingSummary";
import DayPicker from "./DayPicker";
import SlotGrid from "./SlotGrid";
import { dayLong, isSlotOpen, upcomingDays } from "./schedule";

// Grid placement inside the page's two-column layout (see app/places/[id]/page.js).
const LEFT = "flex min-w-0 flex-col gap-5 min-[961px]:col-start-1";
const RIGHT = "min-[961px]:col-start-2 min-[961px]:row-span-2 min-[961px]:row-start-1";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const duration = (m) => (m >= 60 ? `${Number((m / 60).toFixed(1))} hr` : `${m} min`);

function SectionCard({ title, children }) {
  return (
    <Card as="section" className="flex flex-col gap-4">
      <h2 className={`${headingFont} text-xl font-semibold text-ink`}>{title}</h2>
      {children}
    </Card>
  );
}

/** Services, staff, day and slot pickers plus the live summary. Renders only in the browser. */
export default function BookingFlow({ place }) {
  return (
    <BrowserOnly fallback={<FlowSkeleton />}>{() => <Flow place={place} />}</BrowserOnly>
  );
}

function Flow({ place }) {
  const router = useRouter();
  const days = useMemo(() => upcomingDays(), []);
  const anyStaff = `Any ${place.staffRole}`;
  const staffOptions = [anyStaff, ...place.staff].map((s) => ({ value: s, label: s }));

  const [serviceIds, setServiceIds] = useState(() => new Set([place.services[0].id]));
  const [staff, setStaff] = useState(anyStaff);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState(null);
  const [pending, setPending] = useState(false);

  const day = days[dayIndex];
  const slots = SLOT_TIMES.map((label) => ({ label, open: isSlotOpen({ placeId: place.id, staff, day, slot: label }) }));
  const chosen = place.services.filter((s) => serviceIds.has(s.id));

  const toggleService = (id) =>
    setServiceIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Changing staff or day can make the chosen slot unavailable, so clear it.
  const pickStaff = (s) => {
    setStaff(s);
    setSlot(null);
  };
  const pickDay = (i) => {
    setDayIndex(i);
    setSlot(null);
  };

  const confirm = () => {
    setPending(true);
    // TODO: POST the booking ({ placeId, serviceIds, staff, date, slot }) once the bookings API exists.
    router.push("/my-bookings?booked=1");
  };

  return (
    <>
      <div className={LEFT}>
        <SectionCard title="1. Choose services">
          <div role="group" aria-label="Services" className="flex flex-col gap-2">
            {place.services.map((s) => (
              <ToggleOption
                key={s.id}
                title={s.name}
                subtitle={duration(s.minutes)}
                trailing={inr(s.price)}
                selected={serviceIds.has(s.id)}
                onClick={() => toggleService(s.id)}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title={`2. Pick a ${place.staffRole} and time`}>
          <ChipGroup label={`Choose a ${place.staffRole}`} options={staffOptions} value={staff} onChange={pickStaff} />
          <DayPicker days={days} value={dayIndex} onChange={pickDay} />
          <SlotGrid slots={slots} value={slot} onChange={setSlot} />
        </SectionCard>
      </div>

      <div className={RIGHT}>
        <BookingSummary
          when={`${dayLong(day)} · ${slot ?? "pick a time"} · ${staff}`}
          services={chosen}
          canConfirm={chosen.length > 0 && slot !== null}
          pending={pending}
          onConfirm={confirm}
        />
      </div>
    </>
  );
}

function FlowSkeleton() {
  const bar = "animate-pulse rounded-xl bg-surface";
  return (
    <>
      <div className={LEFT} aria-busy="true" aria-label="Loading booking options">
        <Card className="flex flex-col gap-3">
          <div className={`${bar} h-7 w-48`} />
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${bar} h-16`} />
          ))}
        </Card>
        <Card className="flex flex-col gap-3">
          <div className={`${bar} h-7 w-56`} />
          <div className={`${bar} h-16`} />
          <div className={`${bar} h-24`} />
        </Card>
      </div>
      <div className={RIGHT}>
        <Card className="flex flex-col gap-3">
          <div className={`${bar} h-7 w-36`} />
          <div className={`${bar} h-10`} />
          <div className={`${bar} h-[52px]`} />
        </Card>
      </div>
    </>
  );
}

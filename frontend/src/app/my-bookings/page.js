import { Suspense } from "react";
import { requireUser } from "@/services/auth.service";
import { slotlyFonts } from "@/components/fonts";
import { Card, Container } from "@/components/ui";
import BookingList from "@/components/bookings/BookingList";
import ProfileCard from "@/components/bookings/ProfileCard";
import { SAMPLE_BOOKINGS } from "@/data/bookings";

export const metadata = { title: "My bookings" };

export default function MyBookingsPage() {
  return (
    <div className={`${slotlyFonts} flex flex-auto flex-col bg-surface text-ink`}>
      <main className="flex-auto py-8 min-[861px]:py-10">
        <Container className="grid items-start gap-6 min-[961px]:grid-cols-[minmax(0,1fr)_400px]">
          <Suspense fallback={<PageSkeleton />}>
            <MyBookings />
          </Suspense>
        </Container>
      </main>
    </div>
  );
}

async function MyBookings() {
  const user = await requireUser("/my-bookings");
  // TODO: fetch this user's bookings once the bookings API exists.
  const bookings = SAMPLE_BOOKINGS;
  return (
    <>
      <BookingList initialBookings={bookings} />
      <ProfileCard
        user={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          whatsappReminders: user.whatsappReminders,
          createdAt: user.createdAt,
        }}
      />
    </>
  );
}

function PageSkeleton() {
  const bar = "animate-pulse rounded-lg bg-[#E3E6EB]";
  return (
    <>
      <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading bookings">
        <div className={`${bar} h-10 w-48`} />
        <div className={`${bar} h-[100px]`} />
        <div className={`${bar} h-[100px]`} />
      </div>
      <Card className="flex flex-col gap-4">
        <div className={`${bar} h-12 w-2/3`} />
        <div className={`${bar} h-11`} />
        <div className={`${bar} h-11`} />
      </Card>
    </>
  );
}

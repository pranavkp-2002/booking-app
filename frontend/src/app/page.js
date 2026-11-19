import { Suspense } from "react";
import { getCurrentUser } from "@/services/auth.service";
import { slotlyFonts } from "@/components/fonts";
import Footer from "@/components/Footer";
import Explore from "@/components/home/Explore";
import NextAppointment from "@/components/home/NextAppointment";
import { CATEGORIES, PLACES, SAMPLE_NEXT_APPOINTMENT, SORTS } from "@/data/places";
import { ROLES } from "@/utils/roles";

export const metadata = { title: { absolute: "Slotly – Book salons and clinics" } };

export default function Home() {
  return (
    <div className={`${slotlyFonts} flex flex-auto flex-col bg-surface text-ink`}>
      <Explore places={PLACES} categories={CATEGORIES} sorts={SORTS}>
        <Suspense fallback={null}>
          <UserAppointment />
        </Suspense>
      </Explore>
      <Footer />
    </div>
  );
}

// Per-request (reads the session), so it streams in after the static shell.
async function UserAppointment() {
  const user = await getCurrentUser();
  if (user?.role !== ROLES.USER) return null;
  // TODO: replace with the user's real next booking once the bookings API exists.
  return <NextAppointment appointment={SAMPLE_NEXT_APPOINTMENT} />;
}

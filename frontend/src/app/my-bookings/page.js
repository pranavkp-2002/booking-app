import { Suspense } from "react";
import { requireUser } from "@/services/auth.service";

export const metadata = { title: "My bookings" };

export default function MyBookingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">My bookings</h1>
      <Suspense fallback={<p className="mt-2 text-zinc-500">Loading…</p>}>
        <Bookings />
      </Suspense>
    </main>
  );
}

async function Bookings() {
  const user = await requireUser("/my-bookings");
  return (
    <p className="mt-2 text-zinc-500">
      Signed in as {user.email}. You have no bookings yet.
    </p>
  );
}

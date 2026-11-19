import { Suspense } from "react";
import { requireRole } from "@/services/auth.service";
import { ROLES } from "@/utils/roles";

export const metadata = { title: "Shop dashboard" };

export default function ShopPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Shop dashboard</h1>
      <Suspense fallback={<p className="mt-2 text-zinc-500">Loading…</p>}>
        <ShopBookings />
      </Suspense>
    </main>
  );
}

async function ShopBookings() {
  const user = await requireRole([ROLES.SHOP], "/shop");
  return (
    <p className="mt-2 text-zinc-500">
      Signed in as {user.name}. No bookings for your shop yet.
    </p>
  );
}

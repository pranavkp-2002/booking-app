import { Suspense } from "react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth.actions";
import { getCurrentUser } from "@/services/auth.service";
import { ROLES } from "@/utils/roles";

// Static shell (prerendered) + user section streamed in per request.
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-black/10 px-6 py-3 dark:border-white/15">
      <Link href="/" className="font-semibold">
        Booking System
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Suspense fallback={null}>
          <NavUser />
        </Suspense>
      </div>
    </nav>
  );
}

async function NavUser() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Link href="/login">Log in</Link>
        <Link href="/register">Register</Link>
      </>
    );
  }

  return (
    <>
      {user.role === ROLES.USER && <Link href="/my-bookings">My bookings</Link>}
      {user.role === ROLES.SHOP && <Link href="/shop">Shop dashboard</Link>}
      {user.role === ROLES.SUPER_ADMIN && <Link href="/admin">Admin</Link>}
      <span className="text-zinc-500">{user.name}</span>
      <form action={logoutAction}>
        <button type="submit" className="underline">
          Log out
        </button>
      </form>
    </>
  );
}

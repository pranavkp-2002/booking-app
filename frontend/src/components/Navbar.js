import { Suspense } from "react";
import { getCurrentUser } from "@/services/auth.service";
import NavbarClient from "./NavbarClient";

// The shell (brand + public links) is prerendered; the user part streams in per request.
export default function Navbar() {
  return (
    <Suspense fallback={<NavbarClient />}>
      <NavbarWithUser />
    </Suspense>
  );
}

async function NavbarWithUser() {
  const user = await getCurrentUser();
  // Only pass what the client needs.
  return (
    <NavbarClient user={user ? { name: user.name, email: user.email, role: user.role } : null} />
  );
}

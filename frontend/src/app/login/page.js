import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/AuthForm";
import { getCurrentUser } from "@/services/auth.service";
import { safeNext } from "@/utils/safe-next";
import LoginForm from "./LoginForm";

export const metadata = { title: "Log in" };

export default function LoginPage({ searchParams }) {
  return (
    <AuthLayout title="Log in">
      <Suspense fallback={<LoginForm />}>
        <LoginGate searchParams={searchParams} />
      </Suspense>
      <p className="text-sm text-zinc-500">
        No account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

// Reads request data (cookie, ?next=), so it streams in behind the boundary.
async function LoginGate({ searchParams }) {
  const next = safeNext((await searchParams).next, "");
  if (await getCurrentUser()) redirect(next || "/");
  return <LoginForm next={next || undefined} />;
}

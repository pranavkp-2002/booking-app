import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/AuthForm";
import { getCurrentUser } from "@/services/auth.service";
import { safeNext } from "@/utils/safe-next";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage({ searchParams }) {
  return (
    <AuthLayout title="Create an account">
      <Suspense fallback={<RegisterForm />}>
        <RegisterGate searchParams={searchParams} />
      </Suspense>
      <p className="text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

async function RegisterGate({ searchParams }) {
  const next = safeNext((await searchParams).next, "");
  if (await getCurrentUser()) redirect("/");
  return <RegisterForm next={next || undefined} />;
}

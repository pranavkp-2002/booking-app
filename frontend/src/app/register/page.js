import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { linkClass } from "@/components/AuthForm";
import { headingFont, slotlyFonts } from "@/components/fonts";
import { getCurrentUser } from "@/services/auth.service";
import { safeNext } from "@/utils/safe-next";
import RegisterForm from "./RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage({ searchParams }) {
  return (
    <main
      className={`${slotlyFonts} flex flex-1 justify-center bg-[#F5F6F8] px-5 pt-[clamp(24px,5vw,56px)] pb-14 text-[#12151A]`}
    >
      <div className="flex w-full max-w-[560px] flex-col gap-5 self-start rounded-[20px] border border-[#E3E6EB] bg-white p-[clamp(20px,4vw,36px)]">
        <div className="flex flex-col gap-1.5">
          <h1 className={`${headingFont} m-0 text-[28px] font-semibold`}>Create your account</h1>
          <span className="text-[15px] text-[#5A6170]">
            Already have an account?{" "}
            <Link href="/login" className={linkClass}>
              Log in
            </Link>
          </span>
        </div>

        <Suspense fallback={<RegisterForm />}>
          <RegisterGate searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function RegisterGate({ searchParams }) {
  const next = safeNext((await searchParams).next, "");
  if (await getCurrentUser()) redirect("/");
  return <RegisterForm next={next || undefined} />;
}

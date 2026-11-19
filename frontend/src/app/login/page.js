import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { linkClass } from "@/components/AuthForm";
import { headingFont as heading, slotlyFonts } from "@/components/fonts";
import { getCurrentUser } from "@/services/auth.service";
import { safeNext } from "@/utils/safe-next";
import LoginForm from "./LoginForm";

const PERKS = [
  "Real-time slots, no phone calls",
  "Reschedule or cancel in two taps",
  "WhatsApp and SMS reminders",
];

export const metadata = { title: "Log in" };

export default function LoginPage({ searchParams }) {
  return (
    <div
      className={`${slotlyFonts} flex flex-1 flex-wrap bg-[#F5F6F8] text-[#12151A]`}
    >
      {/* Brand panel */}
      <section
        aria-label="About Slotly"
        className="flex min-w-0 flex-[1_1_420px] flex-col justify-between gap-5 bg-[#12151A] p-[clamp(28px,5vw,64px)] text-white sm:gap-8"
      >
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <span
            aria-hidden="true"
            className={`${heading} flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#0E7C6B] font-bold`}
          >
            S
          </span>
          <span className={`${heading} text-[22px] font-semibold`}>Slotly</span>
        </Link>

        <div className="flex max-w-[460px] flex-col gap-4">
          <h1
            className={`${heading} m-0 text-[28px] leading-[1.1] font-semibold sm:text-[clamp(30px,4vw,44px)]`}
          >
            Welcome back
          </h1>
          <p className="hidden text-[17px] leading-[1.55] text-[#C4C9D2] sm:block">
            Log in to see your upcoming appointments, rebook your favourite stylist, and
            manage reminders.
          </p>
          <ul className="mt-2 hidden flex-col gap-2.5 sm:flex">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-[15px] text-[#E3E6EB]">
                <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-[#5FC9B4]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <span className="hidden text-[13px] text-[#A9AFBA] sm:block">
          © 2026 Slotly
        </span>
      </section>

      {/* Form side */}
      <main className="flex min-w-0 flex-[1_1_480px] items-center justify-center p-[clamp(24px,5vw,64px)]">
        <div className="flex w-full max-w-[420px] flex-col gap-[22px]">
          <div className="flex flex-col gap-1.5">
            <h2 className={`${heading} m-0 text-[28px] font-semibold`}>Log in</h2>
            <span className="text-[15px] text-[#5A6170]">
              New to Slotly?{" "}
              <Link href="/register" className={linkClass}>
                Create an account
              </Link>
            </span>
          </div>

          <Suspense fallback={<LoginForm />}>
            <LoginGate searchParams={searchParams} />
          </Suspense>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E3E6EB] bg-white px-4 py-3.5 text-sm">
            <span className="text-[#3A404C]">Own a salon or clinic?</span>
            <Link href="/register" className={linkClass}>
              List your business
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reads request data (cookie, ?next=), so it streams in behind the boundary.
async function LoginGate({ searchParams }) {
  const next = safeNext((await searchParams).next, "");
  if (await getCurrentUser()) redirect(next || "/");
  return <LoginForm next={next || undefined} />;
}

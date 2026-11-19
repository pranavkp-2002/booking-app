"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { Field, FormError, inputClass, SubmitButton } from "@/components/AuthForm";
import { ROLES } from "@/utils/roles";

const ACCOUNT_TYPES = [
  { value: ROLES.USER, title: "Book appointments", sub: "For customers" },
  { value: ROLES.SHOP, title: "List my business", sub: "For salons, spas and clinics" },
];

const STRENGTH_LABELS = ["Use at least 8 characters with a number", "Weak", "Okay", "Good", "Strong"];
const STRENGTH_COLORS = ["", "bg-[#B42318]", "bg-[#B54708]", "bg-[#0E7C6B]", "bg-[#0E7C6B]"];

function passwordScore(v) {
  if (!v) return 0;
  let score = 0;
  if (v.length >= 8) score++;
  if (/\d/.test(v)) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) score++;
  return score;
}

export default function RegisterForm({ next }) {
  const [state, formAction, pending] = useActionState(registerAction, null);
  const fields = state?.fields ?? {};
  const [role, setRole] = useState(fields.role ?? ROLES.USER);
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState(0);

  // React resets the form (clearing the password) after each submit, so reset the meter too.
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setScore(0);
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {next && <input type="hidden" name="next" value={next} />}

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-2 p-0 text-sm font-semibold">I want to</legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
          {ACCOUNT_TYPES.map((t) => (
            <label key={t.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                value={t.value}
                checked={role === t.value}
                onChange={() => setRole(t.value)}
                className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
              />
              <span className="flex flex-col gap-1 rounded-xl border-[1.5px] border-[#E3E6EB] bg-white px-4 py-3.5 peer-checked:border-[#0E7C6B] peer-checked:bg-[#F1FAF7] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0E7C6B]">
                <span className="text-[15px] font-semibold">{t.title}</span>
                <span className="text-[13px] text-[#5A6170]">{t.sub}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <Field label="Full name">
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            placeholder="Priya Sharma"
            required
            defaultValue={fields.name}
          />
        </Field>
        <Field label="Mobile number (optional)">
          <span className="flex h-12 overflow-hidden rounded-xl border border-[#D5D9E0] bg-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0E7C6B]">
            <span className="flex items-center border-r border-[#E3E6EB] bg-[#FAFBFC] px-3 text-[#3A404C]">
              +91
            </span>
            <input
              className="min-w-0 flex-1 border-0 px-3 text-[15px] text-[#12151A] outline-0 placeholder:text-[#9AA0AC]"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98450 12345"
              maxLength={11}
              defaultValue={fields.phone}
            />
          </span>
        </Field>
      </div>

      <Field label="Email">
        <input
          className={inputClass}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          defaultValue={fields.email}
        />
      </Field>

      <div className="flex flex-col gap-1.5 text-sm">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            className={`${inputClass} pr-[72px]`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            aria-describedby="strength-text"
            onChange={(e) => setScore(passwordScore(e.target.value))}
          />
          <button
            type="button"
            aria-controls="password"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute top-1.5 right-1.5 h-9 cursor-pointer rounded-lg px-2.5 text-[13px] font-semibold text-[#0E7C6B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7C6B]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="mt-1 grid grid-cols-4 gap-1" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 rounded-sm transition-colors ${i < score ? STRENGTH_COLORS[score] : "bg-[#E3E6EB]"}`}
            />
          ))}
        </div>
        <span id="strength-text" className="text-[13px] text-[#5A6170]">
          {STRENGTH_LABELS[score]}
        </span>
      </div>

      {role === ROLES.SHOP && (
        <p className="m-0 rounded-[14px] bg-[#F5F6F8] p-4 text-[13px] leading-normal text-[#5A6170]">
          <span className="mb-1 block text-sm font-bold text-[#0A5E51]">Your business</span>
          After signing up you&apos;ll land on your shop dashboard to set up your business.
        </p>
      )}

      <FormError message={state?.error} />

      <SubmitButton pending={pending} pendingText="Creating account…">
        {role === ROLES.SHOP ? "Create business account" : "Create account"}
      </SubmitButton>
    </form>
  );
}

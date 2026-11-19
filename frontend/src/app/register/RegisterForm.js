"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { Field, FormError, RadioGroup, SubmitButton } from "@/components/AuthForm";
import { ROLES } from "@/utils/roles";

const ACCOUNT_TYPES = [
  { value: ROLES.USER, label: "I want to book" },
  { value: ROLES.SHOP, label: "I run a shop" },
];

export default function RegisterForm({ next }) {
  const [state, formAction, pending] = useActionState(registerAction, null);
  const fields = state?.fields ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormError message={state?.error} />
      {next && <input type="hidden" name="next" value={next} />}
      <RadioGroup
        label="Account type"
        name="role"
        options={ACCOUNT_TYPES}
        defaultValue={fields.role ?? ROLES.USER}
      />
      <Field label="Name" name="name" autoComplete="name" required defaultValue={fields.name} />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={fields.email}
      />
      <Field
        label="Phone (optional)"
        name="phone"
        type="tel"
        autoComplete="tel"
        defaultValue={fields.phone}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <SubmitButton pending={pending} pendingText="Creating account…">
        Register
      </SubmitButton>
    </form>
  );
}

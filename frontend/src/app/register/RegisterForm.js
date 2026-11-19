"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { Field, FormError, SubmitButton } from "@/components/AuthForm";

export default function RegisterForm({ next }) {
  const [state, formAction, pending] = useActionState(registerAction, null);
  const fields = state?.fields ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormError message={state?.error} />
      {next && <input type="hidden" name="next" value={next} />}
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

"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Field, FormError, SubmitButton } from "@/components/AuthForm";

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormError message={state?.error} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={state?.fields?.email}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <SubmitButton pending={pending} pendingText="Logging in…">
        Log in
      </SubmitButton>
    </form>
  );
}

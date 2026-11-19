"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Field, FormError, inputClass, SubmitButton } from "@/components/AuthForm";

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      {next && <input type="hidden" name="next" value={next} />}

      <Field label="Email">
        <input
          className={inputClass}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          defaultValue={state?.fields?.email}
        />
      </Field>

      <Field label="Password">
        <input
          className={inputClass}
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <FormError message={state?.error} />

      <div className="mt-1">
        <SubmitButton pending={pending} pendingText="Logging in…">
          Log in
        </SubmitButton>
      </div>
    </form>
  );
}

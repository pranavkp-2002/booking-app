"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/actions/profile.actions";
import { Avatar, Card, Checkbox, Field, Input, buttonClass } from "@/components/ui";

const memberSince = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : null;

/** user: { name, email, phone, whatsappReminders, createdAt } */
export default function ProfileCard({ user }) {
  const [state, action, pending] = useActionState(updateProfileAction, null);
  const values = state?.fields ?? user;
  const since = memberSince(user.createdAt);

  return (
    <Card as="aside" id="profile" aria-label="Profile" className="flex flex-col gap-5 min-[961px]:sticky min-[961px]:top-24">
      <div className="flex items-center gap-3">
        <Avatar name={user.name} size="lg" />
        <span className="flex min-w-0 flex-col gap-0.5">
          <strong className="truncate text-[17px] text-ink">{user.name}</strong>
          {since && <span className="text-sm text-muted">Member since {since}</span>}
        </span>
      </div>

      {/* key resets the uncontrolled inputs to fresh server values after a save */}
      <form action={action} className="flex flex-col gap-4" key={state?.savedAt ?? "initial"}>
        <Field label="Phone">
          <Input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" defaultValue={values.phone ?? ""} />
        </Field>
        <Field label="Email">
          <Input name="email" type="email" autoComplete="email" required defaultValue={values.email ?? ""} />
        </Field>
        <Checkbox
          name="whatsappReminders"
          label="WhatsApp reminders before appointments"
          defaultChecked={values.whatsappReminders ?? true}
        />

        {state?.error && (
          <p role="alert" className="text-[13px] text-danger">
            {state.error}
          </p>
        )}
        {state?.ok && (
          <p role="status" className="text-[13px] font-medium text-success">
            Profile saved.
          </p>
        )}

        <button type="submit" disabled={pending} className={buttonClass({ variant: "dark", className: "min-h-12 w-full" })}>
          {pending ? "Saving…" : "Save profile"}
        </button>
      </form>
    </Card>
  );
}

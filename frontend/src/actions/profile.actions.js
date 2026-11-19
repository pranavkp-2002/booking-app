"use server";

import { refresh } from "next/cache";
import { authService } from "@/services/auth.service";
import { ApiError } from "@/services/http";

export async function updateProfileAction(_prevState, formData) {
  const fields = {
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    whatsappReminders: formData.get("whatsappReminders") === "on",
  };

  if (!fields.email) return { error: "Email is required", fields };

  try {
    await authService.updateMe(fields);
  } catch (err) {
    const error = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
    return { error, fields };
  }

  // Re-render server components (navbar email, profile card) with the saved values.
  refresh();
  return { ok: true, savedAt: Date.now() };
}

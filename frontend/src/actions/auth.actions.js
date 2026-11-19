"use server";

import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ApiError } from "@/services/http";
import { clearSessionToken, setSessionToken } from "@/services/session";
import { homeFor, ROLES } from "@/utils/roles";
import { safeNext } from "@/utils/safe-next";

const field = (formData, key) => String(formData.get(key) ?? "").trim();

const errorMessage = (err) =>
  err instanceof ApiError ? err.message : "Something went wrong. Please try again.";

export async function loginAction(_prevState, formData) {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required", fields: { email } };
  }

  let user;
  try {
    const res = await authService.login(email, password);
    await setSessionToken(res.token);
    user = res.user;
  } catch (err) {
    return { error: errorMessage(err), fields: { email } };
  }

  // redirect() throws, so it must stay outside the try/catch.
  redirect(safeNext(formData.get("next"), homeFor(user.role)));
}

export async function registerAction(_prevState, formData) {
  const fields = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
  };
  const password = String(formData.get("password") ?? "");
  const role = field(formData, "role") || ROLES.USER;

  if (!fields.name || !fields.email || !password) {
    return { error: "Name, email and password are required", fields };
  }

  let user;
  try {
    const { phone, ...rest } = fields;
    // The form shows a fixed +91 prefix, so a bare local number gets it added here.
    const fullPhone = phone && !phone.startsWith("+") ? `+91${phone.replace(/\D/g, "")}` : phone;
    const res = await authService.register({
      ...rest,
      ...(fullPhone && { phone: fullPhone }),
      password,
      role,
    });
    await setSessionToken(res.token);
    user = res.user;
  } catch (err) {
    return { error: errorMessage(err), fields: { ...fields, role } };
  }

  redirect(safeNext(formData.get("next"), homeFor(user.role)));
}

export async function logoutAction() {
  await clearSessionToken();
  redirect("/login");
}

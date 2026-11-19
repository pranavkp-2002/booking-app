import "server-only";
import { cookies } from "next/headers";

// Kept in sync with src/proxy.js (which can't import server-only modules).
export const SESSION_COOKIE = "session";

const MAX_AGE = 7 * 24 * 60 * 60; // seconds; matches the backend's JWT_EXPIRES_IN default

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

/** Only callable from Server Actions / Route Handlers. */
export async function setSessionToken(token) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Only callable from Server Actions / Route Handlers. */
export async function clearSessionToken() {
  (await cookies()).delete(SESSION_COOKIE);
}

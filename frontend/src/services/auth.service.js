import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { api, ApiError } from "./http";
import { getSessionToken } from "./session";

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }, { auth: false }),
  register: (fields) => api.post("/auth/register", fields, { auth: false }),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

/**
 * The logged-in user, or null. Deduplicated per request, so the navbar and
 * the page can both call it while only one request goes to the API.
 */
export const getCurrentUser = cache(async () => {
  if (!(await getSessionToken())) return null;
  try {
    const { user } = await authService.me();
    return user;
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return null;
    throw err;
  }
});

/** Use at the top of a protected Server Component. Redirects to /login if logged out. */
export async function requireUser(returnTo) {
  const user = await getCurrentUser();
  if (!user) {
    redirect(returnTo ? `/login?next=${encodeURIComponent(returnTo)}` : "/login");
  }
  return user;
}

/** Like requireUser, but also redirects to / if the user lacks one of the roles. */
export async function requireRole(roles, returnTo) {
  const user = await requireUser(returnTo);
  if (!roles.includes(user.role)) redirect("/");
  return user;
}

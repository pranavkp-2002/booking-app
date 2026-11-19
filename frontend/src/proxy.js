import { NextResponse } from "next/server";

// Must match SESSION_COOKIE in src/services/session.js.
const SESSION_COOKIE = "session";

/**
 * Optimistic check only: redirects to /login when there is no session cookie
 * at all, before any rendering. The real checks (valid token, role) happen in
 * requireUser / requireRole on the server and in the API middleware.
 */
export function proxy(request) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const url = new URL("/login", request.url);
  url.searchParams.set("next", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/my-bookings/:path*", "/admin/:path*"],
};

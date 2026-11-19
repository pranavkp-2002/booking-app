/** Only allow same-site relative paths from ?next=, to avoid open redirects. */
export function safeNext(value, fallback = "/") {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
    ? next
    : fallback;
}

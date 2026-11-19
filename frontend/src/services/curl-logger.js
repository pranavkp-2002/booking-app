import "server-only";

/**
 * Prints every API call as a copy-pasteable curl command in the Next.js
 * server terminal.
 *
 * API_CURL_LOG controls it:
 *   unset       → on in development, off in production
 *   "off"       → never log
 *   "on"        → always log (secrets redacted)
 *   "unredacted"→ always log with real tokens/passwords (local debugging only)
 */
const mode = process.env.API_CURL_LOG || (process.env.NODE_ENV === "production" ? "off" : "on");

export const curlLogEnabled = mode !== "off";
const redact = mode !== "unredacted";

const SECRET_HEADERS = new Set(["authorization", "cookie"]);
const SECRET_BODY_KEYS = /pass(word)?|token|secret/i;

// Single-quote for POSIX shells; embedded ' becomes '\''.
const q = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;

function redactBody(body) {
  if (!redact || body === undefined) return body;
  return JSON.parse(
    JSON.stringify(body, (key, value) =>
      key && SECRET_BODY_KEYS.test(key) ? "[REDACTED]" : value,
    ),
  );
}

function redactHeader(name, value) {
  if (!redact || !SECRET_HEADERS.has(name.toLowerCase())) return value;
  return name.toLowerCase() === "authorization"
    ? value.replace(/^(\w+)\s+.*/, "$1 [REDACTED]")
    : "[REDACTED]";
}

export function toCurl(url, { method = "GET", headers = {}, body }) {
  const parts = [`curl -X ${method} ${q(url)}`];
  for (const [name, value] of Object.entries(headers)) {
    parts.push(`-H ${q(`${name}: ${redactHeader(name, value)}`)}`);
  }
  if (body !== undefined) parts.push(`--data-raw ${q(JSON.stringify(redactBody(body)))}`);
  return parts.join(" \\\n  ");
}

export function logCurl(url, init) {
  if (curlLogEnabled) console.log(toCurl(url, init));
}

import "server-only";
import { getSessionToken } from "./session";
import { logCurl } from "./curl-logger";

/**
 * Common fetch service. Every call to the backend goes through `apiFetch`,
 * which runs on the server only (Server Components, Server Actions, Route
 * Handlers). The browser never talks to the API directly.
 *
 * - Prefixes the backend base URL (`API_URL`, falling back to
 *   `NEXT_PUBLIC_API_URL`; with or without a trailing `/api`).
 * - Attaches the session token as `Authorization: Bearer` unless `auth: false`.
 * - JSON-encodes `body` and parses the JSON response.
 * - Throws `ApiError` (with `status`) for non-2xx responses.
 * - Logs each call as a curl command (see ./curl-logger.js, API_CURL_LOG).
 */

const BASE_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch(path, { body, auth = true, headers, ...init } = {}) {
  const token = auth ? await getSessionToken() : null;
  const url = `${BASE_URL}/api${path}`;
  const method = init.method || "GET";
  const finalHeaders = {
    Accept: "application/json",
    ...(body !== undefined && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  logCurl(url, { method, headers: finalHeaders, body });

  let res;
  try {
    res = await fetch(url, {
      ...init,
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError("Could not reach the server. Please try again.", 503, {
      cause: err.message,
    });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message || `Request failed (${res.status})`, res.status, data);
  }
  return data;
}

// Convenience helpers.
export const  api = {
  get: (path, opts) => apiFetch(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => apiFetch(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => apiFetch(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => apiFetch(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => apiFetch(path, { ...opts, method: "DELETE" }),
};

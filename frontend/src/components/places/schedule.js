// Date/slot helpers for the booking flow. Browser-only callers: they read the current time.

const DAYS_AHEAD = 7;

/** The next 7 days starting today, as Date objects at local midnight. */
export function upcomingDays(now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Array.from({ length: DAYS_AHEAD }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

export const dayLong = (d) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
export const dayShort = (d) => d.toLocaleDateString("en-IN", { weekday: "short" });

/** "2:15 PM" -> minutes since midnight. */
function toMinutes(label) {
  const [, h, m, ap] = label.match(/(\d+):(\d+) (AM|PM)/);
  return ((Number(h) % 12) + (ap === "PM" ? 12 : 0)) * 60 + Number(m);
}

// Stable pseudo-random "already booked" pattern until real availability comes from the API.
function hash(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/** Whether a slot can be booked: not in the past, and not (mock) taken. */
export function isSlotOpen({ placeId, staff, day, slot, now = new Date() }) {
  const sameDay = day.toDateString() === now.toDateString();
  if (sameDay && toMinutes(slot) <= now.getHours() * 60 + now.getMinutes()) return false;
  return hash(`${placeId}|${staff}|${day.toDateString()}|${slot}`) % 3 !== 0;
}

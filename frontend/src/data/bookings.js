// Placeholder bookings until the backend has a bookings API.
// status: "confirmed" | "pending" | "completed" | "cancelled"

export const BOOKING_TABS = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

/** Which tab a booking status belongs to. */
export const tabFor = (status) =>
  status === "cancelled" ? "cancelled" : status === "completed" ? "past" : "upcoming";

export const SAMPLE_BOOKINGS = [
  { id: "b1", placeId: "lumen", service: "Haircut & styling", place: "Lumen Hair Studio", staff: "with Ananya", date: "2026-11-21", day: "Saturday", time: "11:30 AM", duration: "45 min", price: 589, status: "confirmed" },
  { id: "b2", placeId: "carewell", service: "Skin consultation", place: "CareWell Skin Clinic", staff: "Dr. Iyer", date: "2026-12-03", day: "Thursday", time: "5:00 PM", duration: "30 min", price: 944, status: "pending" },
  { id: "b3", placeId: "still", service: "Deep tissue massage", place: "Still Spa & Wellness", staff: "Kabir", date: "2026-10-18", day: "Saturday", time: "4:00 PM", duration: "60 min", status: "completed" },
  { id: "b4", placeId: "polish", service: "Manicure", place: "Polish Nail Bar", staff: "Sana", date: "2026-10-02", day: "Thursday", time: "6:00 PM", duration: "40 min", status: "cancelled" },
];

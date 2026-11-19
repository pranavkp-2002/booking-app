// Placeholder data until the backend exposes shops/services/bookings endpoints.
// Swap these exports for API calls (e.g. a places.service.js) when they exist.

export const CATEGORIES = [
  { value: "all", label: "All", title: "Popular" },
  { value: "hair", label: "Hair" },
  { value: "skin", label: "Skin" },
  { value: "nails", label: "Nails" },
  { value: "spa", label: "Spa & massage" },
  { value: "dental", label: "Dental" },
  { value: "physio", label: "Physio" },
];

export const SORTS = [
  { value: "rec", label: "Recommended" },
  { value: "near", label: "Nearest" },
  { value: "rating", label: "Top rated" },
  { value: "price", label: "Lowest price" },
];

/** cover: one of the PlaceCard cover colors (teal, blue, amber, pink, purple, grey). */
export const PLACES = [
  { id: "lumen", name: "Lumen Hair Studio", category: "hair", type: "Hair", area: "Indiranagar", km: 1.2, rating: 4.8, price: 499, nextSlot: "Today 2:15 PM", cover: "teal" },
  { id: "carewell", name: "CareWell Skin Clinic", category: "skin", type: "Dermatology", area: "Domlur", km: 2.0, rating: 4.7, price: 800, nextSlot: "Tomorrow 10 AM", cover: "blue" },
  { id: "still", name: "Still Spa & Wellness", category: "spa", type: "Massage", area: "HAL 2nd Stage", km: 3.4, rating: 4.9, price: 1500, nextSlot: "Today 5:00 PM", cover: "amber" },
  { id: "polish", name: "Polish Nail Bar", category: "nails", type: "Nails", area: "Koramangala", km: 4.1, rating: 4.6, price: 350, nextSlot: "Today 4:30 PM", cover: "pink" },
  { id: "brightsmile", name: "BrightSmile Dental", category: "dental", type: "Dental", area: "Indiranagar", km: 0.9, rating: 4.8, price: 600, nextSlot: "Fri 11:00 AM", cover: "purple" },
  { id: "movewell", name: "MoveWell Physio", category: "physio", type: "Physiotherapy", area: "Ulsoor", km: 2.6, rating: 4.7, price: 900, nextSlot: "Tomorrow 9 AM", cover: "grey" },
];

export const SAMPLE_NEXT_APPOINTMENT = {
  service: "Haircut & styling",
  place: "Lumen Hair Studio",
  when: "Sat 21 Nov, 11:30 AM",
};

/** Extra info for the place detail page, keyed by place id. */
const DETAILS = {
  lumen: {
    reviews: 312, address: "12th Main, Indiranagar, Bengaluru", closes: "8 PM", staffRole: "stylist",
    staff: ["Ananya", "Rahul", "Meera", "Kabir"],
    services: [
      { id: "cut", name: "Haircut & styling", minutes: 45, price: 499 },
      { id: "spa", name: "Hair spa", minutes: 60, price: 1200 },
      { id: "beard", name: "Beard trim", minutes: 20, price: 249 },
      { id: "colour", name: "Global hair colour", minutes: 120, price: 2499 },
      { id: "blow", name: "Blow-dry", minutes: 30, price: 399 },
    ],
  },
  carewell: {
    reviews: 188, address: "HAL Old Airport Rd, Domlur, Bengaluru", closes: "7 PM", staffRole: "doctor",
    staff: ["Dr. Iyer", "Dr. Kapoor"],
    services: [
      { id: "consult", name: "Skin consultation", minutes: 30, price: 800 },
      { id: "peel", name: "Chemical peel", minutes: 45, price: 2200 },
      { id: "acne", name: "Acne treatment", minutes: 40, price: 1500 },
    ],
  },
  still: {
    reviews: 421, address: "80 Feet Rd, HAL 2nd Stage, Bengaluru", closes: "9 PM", staffRole: "therapist",
    staff: ["Kabir", "Leela", "Tenzin"],
    services: [
      { id: "deep", name: "Deep tissue massage", minutes: 60, price: 1800 },
      { id: "swedish", name: "Swedish massage", minutes: 60, price: 1500 },
      { id: "foot", name: "Foot reflexology", minutes: 30, price: 900 },
    ],
  },
  polish: {
    reviews: 97, address: "5th Block, Koramangala, Bengaluru", closes: "8:30 PM", staffRole: "nail artist",
    staff: ["Sana", "Riya"],
    services: [
      { id: "mani", name: "Manicure", minutes: 40, price: 350 },
      { id: "pedi", name: "Pedicure", minutes: 50, price: 450 },
      { id: "gel", name: "Gel extensions", minutes: 90, price: 1600 },
    ],
  },
  brightsmile: {
    reviews: 256, address: "100 Feet Rd, Indiranagar, Bengaluru", closes: "7 PM", staffRole: "dentist",
    staff: ["Dr. Rao", "Dr. Menon"],
    services: [
      { id: "check", name: "Dental check-up", minutes: 30, price: 600 },
      { id: "clean", name: "Scaling & polishing", minutes: 45, price: 1500 },
      { id: "whiten", name: "Teeth whitening", minutes: 60, price: 6000 },
    ],
  },
  movewell: {
    reviews: 143, address: "Cambridge Rd, Ulsoor, Bengaluru", closes: "8 PM", staffRole: "physio",
    staff: ["Arjun", "Nisha"],
    services: [
      { id: "assess", name: "Initial assessment", minutes: 45, price: 900 },
      { id: "session", name: "Follow-up session", minutes: 30, price: 700 },
      { id: "sports", name: "Sports massage", minutes: 45, price: 1200 },
    ],
  },
};

export const SLOT_TIMES = ["10:00 AM", "10:45 AM", "11:30 AM", "12:30 PM", "2:15 PM", "3:00 PM", "5:00 PM", "5:45 PM", "6:30 PM"];

export function getPlace(id) {
  const place = PLACES.find((p) => p.id === id);
  return place && { ...place, ...DETAILS[place.id] };
}

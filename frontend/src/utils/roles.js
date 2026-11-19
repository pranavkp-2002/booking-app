// Must match ROLES in backend/src/models/User.js.
export const ROLES = {
  USER: "user",
  SHOP: "shop",
  SUPER_ADMIN: "super_admin",
};

export const ROLE_LABELS = {
  [ROLES.USER]: "User",
  [ROLES.SHOP]: "Shop",
  [ROLES.SUPER_ADMIN]: "Super admin",
};

const ROLE_HOME = {
  [ROLES.USER]: "/my-bookings",
  [ROLES.SHOP]: "/shop",
  [ROLES.SUPER_ADMIN]: "/admin",
};

/** Where to send a user after login/register when there is no ?next=. */
export const homeFor = (role) => ROLE_HOME[role] ?? "/";

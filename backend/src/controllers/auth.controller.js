import User, { SELF_REGISTER_ROLES } from "../models/User.js";
import { COOKIE_NAME, cookieOptions, sendAuthResponse } from "../utils/token.js";

export const register = async (req, res) => {
  const { name, email, phone, password, role = "user" } = req.body ?? {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  // Only allow-listed roles: anyone could otherwise register as a super admin.
  if (!SELF_REGISTER_ROLES.includes(role)) {
    return res.status(400).json({ message: "Invalid account type" });
  }

  const exists = await User.exists({ email: String(email).toLowerCase() });
  if (exists) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const user = await User.create({ name, email, phone, password, role });
  sendAuthResponse(res, user, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: String(email).toLowerCase() }).select(
    "+password",
  );
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  sendAuthResponse(res, user);
};

export const logout = (req, res) => {
  const { maxAge, ...opts } = cookieOptions;
  res.clearCookie(COOKIE_NAME, opts);
  res.json({ message: "Logged out" });
};

export const me = (req, res) => {
  res.json({ user: req.user });
};

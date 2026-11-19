import jwt from "jsonwebtoken";

export const COOKIE_NAME = "token";

const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  // Frontend and API are on different origins in production, so the cookie
  // must be sent cross-site there. On localhost both ports share a site.
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const sendAuthResponse = (res, user, status = 200) => {
  const token = signToken(user);
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(status).json({ user, token });
};

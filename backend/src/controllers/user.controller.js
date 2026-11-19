import User from "../models/User.js";

export const listUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
};

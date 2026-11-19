// Usage: npm run make-admin -- someone@example.com
import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const email = process.argv[2]?.toLowerCase();
if (!email) {
  console.error("Usage: npm run make-admin -- <email>");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const user = await User.findOneAndUpdate(
  { email },
  { role: "admin" },
  { returnDocument: "after" },
);
console.log(user ? `${user.email} is now an admin` : `No user with email ${email}`);
await mongoose.disconnect();
process.exit(user ? 0 : 1);

// Usage: npm run set-role -- <user|shop|super_admin> <email>
//        npm run make-admin -- <email>   (shortcut for super_admin)
import "dotenv/config";
import mongoose from "mongoose";
import User, { ROLES } from "../models/User.js";

const [role, rawEmail] = process.argv.slice(2);
const email = rawEmail?.toLowerCase();
if (!ROLES.includes(role) || !email) {
  console.error(`Usage: npm run set-role -- <${ROLES.join("|")}> <email>`);
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const user = await User.findOneAndUpdate(
  { email },
  { role },
  { returnDocument: "after", runValidators: true },
);
console.log(user ? `${user.email} is now ${role}` : `No user with email ${email}`);
await mongoose.disconnect();
process.exit(user ? 0 : 1);

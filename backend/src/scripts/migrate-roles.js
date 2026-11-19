// One-off: renames the old "admin" role to "super_admin".
// Usage: npm run migrate-roles
import "dotenv/config";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);
const { modifiedCount } = await mongoose.connection
  .collection("users")
  .updateMany({ role: "admin" }, { $set: { role: "super_admin" } });
console.log(`Migrated ${modifiedCount} admin user(s) to super_admin`);
await mongoose.disconnect();

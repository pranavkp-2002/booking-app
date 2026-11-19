import { Suspense } from "react";
import { requireRole } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { ROLE_LABELS, ROLES } from "@/utils/roles";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <h2 className="mt-6 mb-2 font-medium">Users</h2>
      <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
        <UsersTable />
      </Suspense>
    </main>
  );
}

async function UsersTable() {
  await requireRole([ROLES.SUPER_ADMIN], "/admin");
  const users = await userService.list();

  return (
    <table className="w-full text-left text-sm">
      <thead className="text-zinc-500">
        <tr>
          <th className="py-2">Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t border-black/10 dark:border-white/15">
            <td className="py-2">{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone || "—"}</td>
            <td>{ROLE_LABELS[u.role] ?? u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

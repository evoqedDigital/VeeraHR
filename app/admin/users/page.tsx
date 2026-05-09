import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getCmsUsers } from "@/lib/cms/users";
import { UsersManager } from "@/app/admin/users/UsersManager";

export default async function AdminUsersPage() {
  await requireAdminAuth({ roles: ["admin"] });
  const users = await getCmsUsers();

  return (
    <AdminShell title="User Management">
      <p className="mb-4 text-sm text-[#666]">
        Control who can access the CMS. “Admin” has full access. “Jobs only” can manage job openings only.
      </p>
      <UsersManager initialUsers={users} />
    </AdminShell>
  );
}


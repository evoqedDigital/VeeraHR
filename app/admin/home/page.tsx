import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getHomeContent } from "@/lib/data/home";
import { HomeManager } from "@/app/admin/home/HomeManager";

export default async function AdminHomePage({
}: {
}) {
  await requireAdminAuth({ roles: ["admin"] });
  const home = await getHomeContent();

  return (
    <AdminShell title="Manage Home Content">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666]">Edit homepage content.</p>
      </div>
      <HomeManager initialHome={home} />
    </AdminShell>
  );
}

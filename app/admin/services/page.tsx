import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getServiceCategories } from "@/lib/data/service-categories";
import { ServicesManager } from "@/app/admin/services/ServicesManager";

export default async function AdminServicesPage({
}: {
}) {
  await requireAdminAuth({ roles: ["admin"] });
  const services = await getServiceCategories();

  return (
    <AdminShell title="Manage Services">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666]">Add, edit, and delete service cards shown on the Services page.</p>
      </div>
      <ServicesManager initialServices={services} />
    </AdminShell>
  );
}

import { AdminShell, JsonEditorCard } from "@/app/admin/_components";
import { saveServicesAction, resetServicesAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getServiceCategories } from "@/lib/data/service-categories";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdminAuth();
  const params = await searchParams;
  const services = await getServiceCategories();

  return (
    <AdminShell title="Manage Services">
      <JsonEditorCard
        title="Services JSON"
        jsonValue={JSON.stringify(services, null, 2)}
        action={saveServicesAction}
        resetAction={resetServicesAction}
        saved={params.saved === "1"}
      />
    </AdminShell>
  );
}

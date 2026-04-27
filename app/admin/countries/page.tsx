import { AdminShell, JsonEditorCard } from "@/app/admin/_components";
import { saveCountriesAction, resetCountriesAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getCountries } from "@/lib/data/countries";

export default async function AdminCountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdminAuth();
  const params = await searchParams;
  const countries = await getCountries();

  return (
    <AdminShell title="Manage Countries">
      <JsonEditorCard
        title="Countries JSON"
        jsonValue={JSON.stringify(countries, null, 2)}
        action={saveCountriesAction}
        resetAction={resetCountriesAction}
        saved={params.saved === "1"}
      />
    </AdminShell>
  );
}

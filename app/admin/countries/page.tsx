import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getCountries } from "@/lib/data/countries";
import { CountriesManager } from "@/app/admin/countries/CountriesManager";

export default async function AdminCountriesPage({
}: {
}) {
  await requireAdminAuth({ roles: ["admin"] });
  const countries = await getCountries();

  return (
    <AdminShell title="Manage Countries">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666]">Add, edit, and delete the countries shown on the Countries page.</p>
      </div>
      <CountriesManager initialCountries={countries} />
    </AdminShell>
  );
}

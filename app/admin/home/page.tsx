import { AdminShell, JsonEditorCard } from "@/app/admin/_components";
import { saveHomeAction, resetHomeAction } from "@/app/admin/actions";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getHomeContent } from "@/lib/data/home";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdminAuth();
  const params = await searchParams;
  const home = await getHomeContent();

  const editable = {
    heroVideoSources: home.heroVideoSources,
    heroPoster: home.heroPoster,
    aboutImage: home.aboutImage,
    whyImage: home.whyImage,
    industries: home.industries,
    homeServices: home.homeServices,
    outsourceCountryFlags: home.outsourceCountryFlags,
    hrProcessSteps: home.hrProcessSteps,
    whyFeatures: home.whyFeatures,
    testimonials: home.testimonials,
  };

  return (
    <AdminShell title="Manage Home Content">
      <JsonEditorCard
        title="Home JSON"
        jsonValue={JSON.stringify(editable, null, 2)}
        action={saveHomeAction}
        resetAction={resetHomeAction}
        saved={params.saved === "1"}
      />
    </AdminShell>
  );
}

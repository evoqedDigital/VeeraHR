import { AdminShell } from "@/app/admin/_components";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { getJobs } from "@/lib/data/jobs";
import { JobsManager } from "@/app/admin/jobs/JobsManager";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdminAuth({ roles: ["admin", "jobs"] });
  const jobs = await getJobs();

  return (
    <AdminShell title="Manage Job Openings">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#666]">Add, edit, and delete jobs shown on the Job Portal.</p>
      </div>
      <JobsManager initialJobs={jobs} />
    </AdminShell>
  );
}


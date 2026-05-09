"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { readCmsContent, updateCmsContent } from "@/lib/cms/store";
import { JOBS, type Job } from "@/lib/data/jobs";

const JobSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["Full Time", "Part Time", "Contract", "Temporary"]),
  location: z.string().min(1),
  salary: z.coerce.number().nonnegative(),
  currency: z.enum(["AED", "USD"]),
  experience: z.enum(["fresher", "1-3", "3-5"]),
  featured: z.coerce.boolean(),
  isNew: z.coerce.boolean(),
  posted: z.string().min(1),
  logo: z.string().min(1),
  desc: z.string().min(1),
  reqs: z.array(z.string().min(1)).default([]),
  benefits: z.array(z.string().min(1)).default([]),
});

function linesToArray(raw: unknown) {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getCurrentJobs(): Promise<Job[]> {
  const cms = await readCmsContent();
  return Array.isArray(cms.jobs) ? (cms.jobs as Job[]) : JOBS;
}

export async function upsertJobAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin", "jobs"] });

  const parsed = JobSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    category: formData.get("category"),
    type: formData.get("type"),
    location: formData.get("location"),
    salary: formData.get("salary"),
    currency: formData.get("currency"),
    experience: formData.get("experience"),
    featured: formData.get("featured") === "on",
    isNew: formData.get("isNew") === "on",
    posted: formData.get("posted"),
    logo: formData.get("logo"),
    desc: formData.get("desc"),
    reqs: linesToArray(formData.get("reqs")),
    benefits: linesToArray(formData.get("benefits")),
  });

  if (!parsed.success) {
    return { ok: false, error: "Invalid job data. Please check required fields." };
  }

  const job = parsed.data;
  const jobs = await getCurrentJobs();

  const nextJobs = (() => {
    if (job.id) {
      const idx = jobs.findIndex((j) => j.id === job.id);
      if (idx === -1) return [...jobs, job as Job];
      const copy = [...jobs];
      copy[idx] = job as Job;
      return copy;
    }
    const nextId = Math.max(0, ...jobs.map((j) => j.id)) + 1;
    return [...jobs, { ...(job as Omit<Job, "id">), id: nextId }];
  })();

  await updateCmsContent({ jobs: nextJobs });
  revalidatePath("/job-portal");
  revalidatePath("/admin/jobs");
  return { ok: true };
}

export async function deleteJobAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin", "jobs"] });
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) return { ok: false, error: "Invalid id." };

  const jobs = await getCurrentJobs();
  const nextJobs = jobs.filter((j) => j.id !== id);
  await updateCmsContent({ jobs: nextJobs });
  revalidatePath("/job-portal");
  revalidatePath("/admin/jobs");
  return { ok: true };
}


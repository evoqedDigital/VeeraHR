"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginAdmin, logoutAdmin, requireAdminAuth } from "@/lib/cms/admin-auth";
import { readCmsContent, updateCmsContent } from "@/lib/cms/store";
import { SERVICE_CATEGORIES } from "@/lib/data/service-categories";
import { COUNTRIES } from "@/lib/data/countries";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getHomeContent } from "@/lib/data/home";
import { JOBS } from "@/lib/data/jobs";

function parseJsonField<T>(formData: FormData, key: string): T {
  const raw = String(formData.get(key) ?? "");
  return JSON.parse(raw) as T;
}

export async function loginAction(formData: FormData) {
  const ok = await loginAdmin(
    String(formData.get("username") ?? ""),
    String(formData.get("password") ?? ""),
  );
  if (!ok) redirect("/admin/login?error=invalid");
  redirect("/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function saveServicesAction(formData: FormData) {
  await requireAdminAuth();
  const data = parseJsonField(formData, "json");
  await updateCmsContent({ services: data });
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services?saved=1");
}

export async function saveCountriesAction(formData: FormData) {
  await requireAdminAuth();
  const data = parseJsonField(formData, "json");
  await updateCmsContent({ countries: data });
  revalidatePath("/");
  revalidatePath("/countries");
  redirect("/admin/countries?saved=1");
}

export async function saveBlogsAction(formData: FormData) {
  await requireAdminAuth();
  const data = parseJsonField(formData, "json");
  await updateCmsContent({ blogs: data });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blogs?saved=1");
}

export async function saveHomeAction(formData: FormData) {
  await requireAdminAuth();
  const data = parseJsonField(formData, "json");
  await updateCmsContent({ home: data });
  revalidatePath("/");
  redirect("/admin/home?saved=1");
}

export async function resetServicesAction() {
  await requireAdminAuth();
  const current = await readCmsContent();
  await updateCmsContent({ ...current, services: SERVICE_CATEGORIES });
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services?saved=1");
}

export async function resetCountriesAction() {
  await requireAdminAuth();
  const current = await readCmsContent();
  await updateCmsContent({ ...current, countries: COUNTRIES });
  revalidatePath("/");
  revalidatePath("/countries");
  redirect("/admin/countries?saved=1");
}

export async function resetBlogsAction() {
  await requireAdminAuth();
  const current = await readCmsContent();
  await updateCmsContent({ ...current, blogs: BLOG_POSTS });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blogs?saved=1");
}

export async function resetHomeAction() {
  await requireAdminAuth();
  const current = await readCmsContent();
  const home = await getHomeContent();
  await updateCmsContent({
    ...current,
    home: {
      heroVideoSources: home.heroVideoSources,
      heroPoster: home.heroPoster,
      industries: home.industries,
      homeServices: home.homeServices,
      outsourceCountryFlags: home.outsourceCountryFlags,
      hrProcessSteps: home.hrProcessSteps,
      whyFeatures: home.whyFeatures,
      testimonials: home.testimonials,
      aboutImage: home.aboutImage,
      whyImage: home.whyImage,
    },
  });
  revalidatePath("/");
  redirect("/admin/home?saved=1");
}

export async function saveJobsAction(formData: FormData) {
  await requireAdminAuth();
  const data = parseJsonField(formData, "json");
  await updateCmsContent({ jobs: data });
  revalidatePath("/job-portal");
  redirect("/admin/jobs?saved=1");
}

export async function resetJobsAction() {
  await requireAdminAuth();
  const current = await readCmsContent();
  await updateCmsContent({ ...current, jobs: JOBS });
  revalidatePath("/job-portal");
  redirect("/admin/jobs?saved=1");
}

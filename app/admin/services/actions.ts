"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { readCmsContent, updateCmsContent } from "@/lib/cms/store";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/data/service-categories";

const ServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  imagePosition: z.string().optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
});

async function getCurrentServices(): Promise<ServiceCategory[]> {
  const cms = await readCmsContent();
  return Array.isArray(cms.services) ? (cms.services as ServiceCategory[]) : SERVICE_CATEGORIES;
}

export async function upsertServiceAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });

  const indexRaw = formData.get("index");
  const index = indexRaw === null || indexRaw === "" ? null : Number(indexRaw);

  const parsed = ServiceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    imagePosition: formData.get("imagePosition"),
  });
  if (!parsed.success) return { ok: false, error: "Invalid service data." };

  const services = await getCurrentServices();
  const next = [...services];

  if (index !== null && Number.isFinite(index) && index >= 0 && index < next.length) {
    next[index] = parsed.data;
  } else {
    next.push(parsed.data);
  }

  await updateCmsContent({ services: next });
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true };
}

export async function deleteServiceAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });
  const index = Number(formData.get("index"));
  if (!Number.isFinite(index) || index < 0) return { ok: false, error: "Invalid index." };

  const services = await getCurrentServices();
  if (index >= services.length) return { ok: false, error: "Service not found." };

  const next = services.filter((_, i) => i !== index);
  await updateCmsContent({ services: next });
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true };
}


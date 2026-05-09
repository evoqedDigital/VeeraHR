"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { readCmsContent, updateCmsContent } from "@/lib/cms/store";
import { COUNTRIES, type CountryRow } from "@/lib/data/countries";

const CountrySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  cityLabel: z.string().optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  imageLeft: z.coerce.boolean(),
  positions: z.array(z.string().min(1)).default([]),
});

function linesToArray(raw: unknown) {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function getCurrentCountries(): Promise<CountryRow[]> {
  const cms = await readCmsContent();
  return Array.isArray(cms.countries) ? (cms.countries as CountryRow[]) : COUNTRIES;
}

export async function upsertCountryAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });

  const indexRaw = formData.get("index");
  const index = indexRaw === null || indexRaw === "" ? null : Number(indexRaw);

  const parsed = CountrySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    cityLabel: formData.get("cityLabel"),
    imageLeft: formData.get("imageLeft") === "on",
    positions: linesToArray(formData.get("positions")),
  });
  if (!parsed.success) return { ok: false, error: "Invalid country data." };

  const rows = await getCurrentCountries();
  const next = [...rows];

  if (index !== null && Number.isFinite(index) && index >= 0 && index < next.length) {
    next[index] = parsed.data;
  } else {
    next.push(parsed.data);
  }

  await updateCmsContent({ countries: next });
  revalidatePath("/countries");
  revalidatePath("/");
  revalidatePath("/admin/countries");
  return { ok: true };
}

export async function deleteCountryAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });
  const index = Number(formData.get("index"));
  if (!Number.isFinite(index) || index < 0) return { ok: false, error: "Invalid index." };

  const rows = await getCurrentCountries();
  if (index >= rows.length) return { ok: false, error: "Country not found." };

  const next = rows.filter((_, i) => i !== index);
  await updateCmsContent({ countries: next });
  revalidatePath("/countries");
  revalidatePath("/");
  revalidatePath("/admin/countries");
  return { ok: true };
}


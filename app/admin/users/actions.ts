"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/cms/admin-auth";
import { deleteCmsUser, upsertCmsUser } from "@/lib/cms/users";

const UserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "jobs"]),
  active: z.coerce.boolean(),
});

export async function upsertUserAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });
  const parsed = UserSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
    active: formData.get("active") === "on",
  });
  if (!parsed.success) return { ok: false, error: "Invalid user data." };

  await upsertCmsUser({ email: parsed.data.email, role: parsed.data.role, active: parsed.data.active });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function deleteUserAction(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdminAuth({ roles: ["admin"] });
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { ok: false, error: "Invalid email." };
  await deleteCmsUser(email);
  revalidatePath("/admin/users");
  return { ok: true };
}


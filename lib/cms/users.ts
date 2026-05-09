import "server-only";

import { readCmsContent, updateCmsContent } from "@/lib/cms/store";

export type CmsUserRole = "admin" | "jobs";

export type CmsUser = {
  email: string;
  role: CmsUserRole;
  active: boolean;
  createdAt: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getCmsUsers(): Promise<CmsUser[]> {
  const cms = await readCmsContent();
  const users = Array.isArray(cms.users) ? (cms.users as CmsUser[]) : [];
  return users
    .filter((u) => u && typeof u.email === "string")
    .map((u) => ({
      email: normalizeEmail(u.email),
      role: u.role === "jobs" ? "jobs" : "admin",
      active: Boolean(u.active ?? true),
      createdAt: typeof u.createdAt === "string" ? u.createdAt : new Date().toISOString(),
    }));
}

export async function upsertCmsUser(user: { email: string; role: CmsUserRole; active: boolean }) {
  const email = normalizeEmail(user.email);
  const users = await getCmsUsers();
  const idx = users.findIndex((u) => u.email === email);
  const next = [...users];
  if (idx === -1) {
    next.push({ email, role: user.role, active: user.active, createdAt: new Date().toISOString() });
  } else {
    next[idx] = { ...next[idx], role: user.role, active: user.active };
  }
  await updateCmsContent({ users: next });
}

export async function deleteCmsUser(email: string) {
  const e = normalizeEmail(email);
  const users = await getCmsUsers();
  const next = users.filter((u) => u.email !== e);
  await updateCmsContent({ users: next });
}

export async function findActiveUser(email: string): Promise<CmsUser | null> {
  const e = normalizeEmail(email);
  const users = await getCmsUsers();
  const u = users.find((x) => x.email === e);
  if (!u || !u.active) return null;
  return u;
}


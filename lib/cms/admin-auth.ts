import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "vh_admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export async function isAdminAuthenticated() {
  return (await cookies()).get(COOKIE_NAME)?.value === "1";
}

export async function requireAdminAuth() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

export async function loginAdmin(password: string) {
  if (password !== getAdminPassword()) return false;
  (await cookies()).set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE_NAME);
}

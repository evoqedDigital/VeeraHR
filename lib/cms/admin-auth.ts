import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { CmsUserRole } from "@/lib/cms/users";
import { findActiveUser } from "@/lib/cms/users";

const COOKIE_NAME = "vh_admin";
const OTP_COOKIE_NAME = "vh_admin_otp";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required for admin login.");
  }
  return new TextEncoder().encode(secret);
}

function getAdminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

function getBootstrapAdminEmail() {
  // If ADMIN_USERNAME is an email, allow it to bootstrap initial access.
  const u = String(process.env.ADMIN_USERNAME || "").trim().toLowerCase();
  return u.includes("@") ? u : "";
}

export type AdminRole = CmsUserRole;

async function verifyPassword(plain: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return bcrypt.compare(plain, hash);

  const fallback = process.env.ADMIN_PASSWORD;
  if (!fallback) return false;

  const a = Buffer.from(String(plain));
  const b = Buffer.from(String(fallback));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

async function setAdminSession(input: { role: AdminRole; email?: string }) {
  const token = await new SignJWT({ role: input.role, email: input.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("veerahr-admin")
    .setAudience("veerahr-admin")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionSecret());

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function isAdminAuthenticated() {
  return (await getAdminSession()) !== null;
}

export async function getAdminSession(): Promise<{ role: AdminRole; email?: string } | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), { issuer: "veerahr-admin" });
    const role = payload.role === "jobs" ? "jobs" : "admin";
    const email = typeof payload.email === "string" ? payload.email : undefined;
    return { role, email };
  } catch {
    return null;
  }
}

export async function requireAdminAuth(options?: { roles?: AdminRole[] }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const roles = options?.roles;
  if (roles && roles.length > 0 && !roles.includes(session.role)) {
    // If a jobs-only user hits an admin-only page, send them to Jobs instead.
    if (session.role === "jobs") redirect("/admin/jobs?error=forbidden");
    redirect("/admin?error=forbidden");
  }
}

export async function loginAdmin(username: string, password: string) {
  if (username !== getAdminUsername()) return false;
  if (!(await verifyPassword(password))) return false;
  await setAdminSession({ role: "admin" });
  return true;
}

function otpHash(code: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  return crypto.createHash("sha256").update(`${code}:${secret}`).digest("hex");
}

export async function issueAdminOtp(email: string, code: string) {
  const e = email.trim().toLowerCase();
  const user = await findActiveUser(e);
  const bootstrap = getBootstrapAdminEmail();
  if (!user && (!bootstrap || bootstrap !== e)) throw new Error("email_not_allowed");

  const token = await new SignJWT({
    email: e,
    otp: otpHash(code),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("veerahr-admin-otp")
    .setAudience("veerahr-admin-otp")
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(getSessionSecret());

  (await cookies()).set(OTP_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 10,
  });
}

export async function verifyAdminOtp(email: string, code: string) {
  const token = (await cookies()).get(OTP_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), { issuer: "veerahr-admin-otp" });
    const e = email.trim().toLowerCase();
    if (payload.email !== e) return false;
    if (payload.otp !== otpHash(code)) return false;
    const user = await findActiveUser(e);
    const bootstrap = getBootstrapAdminEmail();
    if (!user && (!bootstrap || bootstrap !== e)) return false;
    (await cookies()).delete(OTP_COOKIE_NAME);
    await setAdminSession({ role: user?.role ?? "admin", email: user?.email ?? e });
    return true;
  } catch {
    return false;
  }
}

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE_NAME);
  (await cookies()).delete(OTP_COOKIE_NAME);
}

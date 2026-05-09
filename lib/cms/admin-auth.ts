import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "vh_admin";

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

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSessionSecret(), { issuer: "veerahr-admin" });
    return true;
  } catch {
    return false;
  }
}

export async function requireAdminAuth() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

export async function loginAdmin(username: string, password: string) {
  if (username !== getAdminUsername()) return false;
  if (!(await verifyPassword(password))) return false;

  const token = await new SignJWT({ role: "admin" })
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
  return true;
}

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE_NAME);
}

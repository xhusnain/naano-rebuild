"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/password";
import { signSession } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  secure: process.env.NODE_ENV === "production",
};

async function startSession(userId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, signSession(userId), COOKIE_OPTS);
}

export async function login(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { email } });

  // Same message either way — telling the caller which half was wrong is a
  // free account-enumeration oracle.
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "That email and password do not match." };
  }

  await startSession(user.id);
  redirect(user.role === "creator" ? "/studio" : "/app");
}

export async function register(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "brand");
  const companyName = String(formData.get("companyName") ?? "").trim();

  if (!email.includes("@")) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Use at least 8 characters." };
  if (!name) return { error: "Tell us your name." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with that email already exists." };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(password),
      name,
      role: role === "influencer" || role === "creator" ? "creator" : "brand",
      companyName: companyName || null,
    },
  });

  await startSession(user.id);
  redirect(user.role === "creator" ? "/studio" : "/app");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/");
}

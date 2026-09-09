import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const SESSION_COOKIE = "naano_uid";

/**
 * The signed-in user.
 *
 * Auth (step 2) is not built yet. Until it is, this falls back to the seeded
 * demo brand so the campaign flow is usable and testable on its own. When auth
 * lands it only has to set and clear SESSION_COOKIE — every caller of this
 * function stays unchanged.
 */
export async function getCurrentUser() {
  const jar = await cookies();
  const id = jar.get(SESSION_COOKIE)?.value;

  if (id) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) return user;
  }

  // TODO(step 2): remove this fallback once /login issues real sessions.
  return prisma.user.findFirst({ where: { role: "brand" } });
}

export async function requireBrand() {
  const user = await getCurrentUser();
  if (!user || user.role !== "brand") return null;
  return user;
}

import { createHmac, timingSafeEqual } from "node:crypto";

// A dev fallback keeps the app runnable with no .env; production must set it.
const SECRET =
  process.env.SESSION_SECRET ?? "naano-rebuild-dev-secret-not-for-production";

/**
 * Session cookies are signed. Storing a bare user id would let anyone read
 * another account's dashboard by editing one cookie value in devtools.
 */
export function signSession(userId: string): string {
  const mac = createHmac("sha256", SECRET).update(userId).digest("base64url");
  return `${userId}.${mac}`;
}

export function readSession(cookie: string | undefined): string | null {
  if (!cookie) return null;
  const i = cookie.lastIndexOf(".");
  if (i < 1) return null;

  const userId = cookie.slice(0, i);
  const given = Buffer.from(cookie.slice(i + 1));
  const expected = Buffer.from(
    createHmac("sha256", SECRET).update(userId).digest("base64url")
  );

  if (given.length !== expected.length) return null;
  return timingSafeEqual(given, expected) ? userId : null;
}

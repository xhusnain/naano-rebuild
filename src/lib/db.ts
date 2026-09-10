import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma 7 takes the connection through a driver adapter rather than a URL in
 * the schema, so the adapter is chosen here from the URL scheme:
 *
 *   file:./dev.db            -> SQLite   (local development)
 *   postgres://... | postgresql://...  -> Postgres (deployed)
 *
 * SQLite cannot run on Vercel — serverless filesystems are read-only and
 * ephemeral, so the click history would vanish between invocations and the
 * attribution demo would break. Deploying means running `npm run use:postgres`
 * to flip the schema provider, then setting DATABASE_URL.
 */
const url = process.env.DATABASE_URL ?? "file:./dev.db";
const isPostgres = /^postgres(ql)?:\/\//i.test(url);

const makeClient = () =>
  new PrismaClient({
    adapter: isPostgres
      ? new PrismaPg({ connectionString: url })
      : new PrismaBetterSqlite3({ url }),
  });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? makeClient();

// Next dev reloads modules on every edit; without this the process leaks a new
// connection pool per reload until the driver starts refusing handles.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

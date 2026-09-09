import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prisma 7 takes the connection through a driver adapter rather than a URL in
// the schema. SQLite for local development; swapping to Postgres later means
// changing the provider and the adapter, not the queries.
const makeClient = () =>
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? "file:./dev.db",
    }),
  });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? makeClient();

// Next dev reloads modules on every edit; without this the process leaks a new
// connection pool per reload until SQLite starts refusing handles.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

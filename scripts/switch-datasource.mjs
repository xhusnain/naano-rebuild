#!/usr/bin/env node
/**
 * Flip prisma/schema.prisma between sqlite and postgresql.
 *
 * The datasource provider is a static string in the schema — it cannot be read
 * from an env var — so switching databases needs this one edit. The driver
 * adapter in src/lib/db.ts already picks itself from DATABASE_URL, and no query
 * in the app changes.
 *
 *   npm run use:postgres    # before deploying
 *   npm run use:sqlite      # back to local development
 */
import { readFileSync, writeFileSync } from "node:fs";

const target = process.argv[2];
if (target !== "sqlite" && target !== "postgresql") {
  console.error("usage: node scripts/switch-datasource.mjs <sqlite|postgresql>");
  process.exit(1);
}

const path = "prisma/schema.prisma";
const src = readFileSync(path, "utf8");
const next = src.replace(
  /(datasource db \{\s*\n\s*provider\s*=\s*)"[^"]+"/,
  `$1"${target}"`
);

if (next === src) {
  console.log(`schema already targets ${target}, nothing to do`);
  process.exit(0);
}

writeFileSync(path, next);
console.log(`schema now targets ${target}`);
console.log(
  target === "postgresql"
    ? "next: set DATABASE_URL to your Postgres URL, then `npx prisma db push` and `npm run db:seed`"
    : "next: `npm run db:push` and `npm run db:seed`"
);

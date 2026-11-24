import "dotenv/config";
import { defineConfig } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push). The runtime PrismaClient
// in lib/prisma.ts connects separately via a driver adapter (@prisma/adapter-pg),
// which is required in Prisma 7 - this file does not configure that connection.
//
// Read DIRECT_URL directly (not via the `env()` helper) so this file can
// still load when it's unset - `prisma generate` (run on every `npm install`
// via postinstall) doesn't touch the database and must never fail just
// because DIRECT_URL isn't configured in this environment. Commands that do
// need a real connection (migrate, db push) will fail with a normal
// Postgres connection error instead, which is the correct failure mode.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? "",
  },
});

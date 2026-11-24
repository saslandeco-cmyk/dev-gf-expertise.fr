import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push). The runtime PrismaClient
// in lib/prisma.ts connects separately via a driver adapter (@prisma/adapter-pg),
// which is required in Prisma 7 - this file does not configure that connection.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"),
  },
});

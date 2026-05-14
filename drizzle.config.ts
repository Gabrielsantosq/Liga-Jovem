import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./packages/auth/lib/auth-schema.ts",
  out: "./packages/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./src/drizzle",
  dialect: "sqlite", // Changed from postgresql
  dbCredentials: {
    url: "./src/db/sqlite.db",
  },
});

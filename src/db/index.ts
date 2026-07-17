// lib/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// Initialize the SQLite connection
const sqlite = new Database("./src/db/sqlite.db");

// Export the db instance with your schema
export const db = drizzle(sqlite, { schema });

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const localFallbackUrl =
  "postgres://postgres:postgres@localhost:5432/naturotopia";
const connectionString =
  process.env.DATABASE_URL ||
  (process.env.VERCEL ? undefined : localFallbackUrl);

if (!connectionString) {
  throw new Error(
    "Missing DATABASE_URL. Add your Postgres connection string in Vercel project settings.",
  );
}

export const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production" || process.env.VERCEL
      ? { rejectUnauthorized: false }
      : false,
});

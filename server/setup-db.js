import "dotenv/config";
import pg from "pg";
import { initializeDatabase } from "./seed.js";
import { pool } from "./db.js";

const { Client } = pg;
const targetUrl = new URL(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/naturotopia",
);
const databaseName = targetUrl.pathname.slice(1) || "naturotopia";
const adminUrl = new URL(
  process.env.PGADMIN_DATABASE_URL || targetUrl.toString(),
);
adminUrl.pathname = "/postgres";

const admin = new Client({ connectionString: adminUrl.toString() });

async function setup() {
  await admin.connect();
  const result = await admin.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [databaseName],
  );
  if (result.rowCount === 0) {
    const identifier = `"${databaseName.replaceAll('"', '""')}"`;
    await admin.query(`CREATE DATABASE ${identifier}`);
    console.log(`Created PostgreSQL database: ${databaseName}`);
  } else {
    console.log(`PostgreSQL database already exists: ${databaseName}`);
  }
  await admin.end();
  await initializeDatabase();
  await pool.end();
}

setup().catch(async (error) => {
  console.error("Could not set up PostgreSQL:", error.message);
  await admin.end().catch(() => {});
  await pool.end().catch(() => {});
  process.exit(1);
});

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});
export async function checkDBConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("[DB] Connected successfully");
  } catch (err) {
    console.error("[DB] Connection failed", err);
    process.exit(1); // stop app
  }
}
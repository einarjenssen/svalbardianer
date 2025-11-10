// src/lib/server/db.ts
import { Pool } from 'pg';
import { POSTGRES_URL } from '$env/static/private';

// Environment variables from .env
const pool = new Pool({
  connectionString: POSTGRES_URL,
  //ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Reusable query function
export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

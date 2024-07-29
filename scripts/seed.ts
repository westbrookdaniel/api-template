import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import * as schema from '../src/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite = new Database(process.env.DB_URL);

const db = drizzle(sqlite, { schema });

migrate(db, {
  migrationsFolder: path.join(__dirname, '../src/migrations'),
});

await db.insert(schema.notes).values({
  title: 'My Note',
  description: 'Something thoughtful',
});

console.log('Seeded');

import fp from 'fastify-plugin';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import * as schema from '../schema';

declare module 'fastify' {
  interface FastifyInstance {
    db: BetterSQLite3Database<typeof schema>;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default fp(async (fastify) => {
  const sqlite = new Database(process.env.DB_URL);

  const db = drizzle(sqlite, { schema });

  migrate(db, {
    migrationsFolder: path.join(__dirname, '../migrations'),
  });

  fastify.decorate('db', db);

  fastify.addHook('onClose', () => {
    sqlite.close();
  });
});

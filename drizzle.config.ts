import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema/index.ts',
  dialect: 'sqlite',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});

import app from '../src/app';
import { after } from 'node:test';

process.env.NODE_ENV = 'test';
process.env.DB_URL = ':memory:';

export async function build() {
  const fastify = await app();

  after(() => {
    fastify.close();
  });

  return fastify;
}

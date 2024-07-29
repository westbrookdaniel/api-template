import path from 'path';
import AutoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { fileURLToPath } from 'url';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

declare global {
  type Route = FastifyPluginAsyncTypebox;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function app() {
  const logger =
    process.env.NODE_ENV === 'production'
      ? true
      : process.env.NODE_ENV === 'test'
        ? false
        : { transport: { target: 'pino-pretty' } };

  const fastify = Fastify({ logger });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });

  return fastify;
}

import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
);

export default fp(async (fastify) => {
  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'My App',
        version,
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
  });

  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
  });

  fastify.addHook('onReady', async () => {
    fastify.swagger();
  });
});

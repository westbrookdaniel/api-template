import 'dotenv/config';
import app from './app';

const fastify = await app();

try {
  await fastify.listen({ port: parseInt(process.env.PORT || '3000') });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

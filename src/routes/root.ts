import { Type } from '@fastify/type-provider-typebox';

const root: Route = async (app) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: Type.Object({ message: Type.String() }),
      },
    },
    handler: async () => {
      return { message: 'Hello World!' };
    },
  });
};

export default root;

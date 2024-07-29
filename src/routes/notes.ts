import { Type } from '@fastify/type-provider-typebox';
import { selectNoteSchema } from '../schema';

const root: Route = async (app) => {
  app.route({
    method: 'GET',
    url: '/notes',
    schema: {
      response: {
        200: Type.Array(selectNoteSchema),
      },
    },
    handler: async () => {
      return app.db.query.notes.findMany();
    },
  });
};

export default root;

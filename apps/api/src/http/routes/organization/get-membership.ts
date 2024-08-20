import { auth } from '@/http/middlewares/auth';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ZodType } from 'zod';

export async function getMemebership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/organization/:slug/membership', async (request, reply) => {});
}

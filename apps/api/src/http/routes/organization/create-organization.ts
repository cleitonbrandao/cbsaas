import { auth } from '@/http/middlewares/auth';
import { prisma } from '@/ilb/prisma';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequestError } from '../_erros/bad-request-error';
import { createSlug } from '@/utils/create-slug';
import { organizationSchema } from '@cbsaas/auth';

export async function createOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organization',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Create a New Organizaiton',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            shouldAttachUserByDomain: z.boolean().optional(),
          }),
          response: {
            201: z.object({
              organizationId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();
        const { name, domain, shouldAttachUserByDomain } = request.body;

        if (domain) {
          const organizationByDomain = await prisma.organization.findUnique({
            where: { domain },
          });

          if (organizationByDomain) {
            throw new BadRequestError(
              'Another organization with same domain already exist.'
            );
          }
        }

        const organization = await prisma.organization.create({
          data: {
            name,
            slug: createSlug(name),
            domain,
            shouldAttachUserByDomain,
            ownerId: userId,

            members: {
              create: {
                userId,
                role: 'ADMIN',
              },
            },
          },
        });

        return reply.status(201).send({
          organizationId: organization.id,
        });
      }
    );
}

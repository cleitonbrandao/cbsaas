import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from '@/ilb/prisma';
import { roleSchema } from "@cbsaas/auth";

export async function updateMember(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organizations/:slug/members/:memberId',
        {
            schema: {
                tags: ['members'],
                summary: 'Update a member',
                security: [{ baererAuth: [] }],
                body: z.object({
                    role: roleSchema
                }),
                params: z.object({
                    slug: z.string(),
                    memberId: z.string().uuid()
                }),
                response: {
                    204: z.null(),
                }
            }
        },
        async (request, reply) => {

            return reply.status(204).send()
        }
    )
}
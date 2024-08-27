import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function getOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get('/organizations/:slug', {
        schema: {
            tags: ['organizations'],
            summary: 'Get details from organization',
            security: [{ bearerAuth: [] }],
            params: z.object({
                slug: z.string(),
            }),
            response: {
                200: z.object({
                    organization: z.object({
                        id: z.string().uuid(),
                        name: z.string(),
                        slug: z.string(),
                        domain: z.string().nullable(),
                        shouldAttachUserByDomain: z.boolean(),
                        avatarUrl: z.string().nullable(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        ownerId: z.string().uuid(),
                    })
                })
            }
        }
    }, async (request) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return {
            organization,
        }
    })
}
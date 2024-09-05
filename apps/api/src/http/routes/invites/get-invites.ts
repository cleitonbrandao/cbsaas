import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { roleSchema } from "@cbsaas/auth";

export async function getInvites(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/invites',
        {
            schema: {
                tags: ['invites'],
                summary: 'Get all organization invites',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        invites: z.object({
                            id: z.string().uuid(),
                            email: z.string().email(),
                            role: roleSchema,
                            createdAt: z.date(),
                            author: z.object({
                                id: z.string().uuid(),
                                name: z.string().nullable(),
                            }).nullable()
                        })
                    })
                }
            }
        },
        async (request) => {
            const { slug } = request.params
            const userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('get', 'Invite')){
                throw new UnauthoraziedError(`You're not allowed to get organization invites.`)
            }

            const invites = await prisma.invite.findMany({
                where: {
                    organizationId: organization.id
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return { invites }
        }
    )
}
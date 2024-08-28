import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from '@/ilb/prisma';

export async function getMembers(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organization/:slug/members', 
        {
            schema: {
                tags: ['members'],
                summary: 'Get all organization members.',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        members: z.array(
                            z.object({
                                userId: z.string().uuid(),
                                id: z.string().uuid(),
                                name: z.string().nullable(),
                                email: z.string(),
                                role: z.string(),
                                avatarUrl: z.string().nullable()
                            })
                        )
                    })
                }
            }
        }, 
        async (request, reply) => {
            const { slug } = request.params
            const  userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('get', 'User')) {
                throw new UnauthoraziedError(`You're not allowed see organization members.`)
            }

            const members = await prisma.member.findMany({
                select: {
                    id: true,
                    role: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatarUrl: true
                        }
                    }
                },
                where: {
                    organizationId: organization.id
                },
                orderBy: {
                    role: 'asc'
                }
            })

            const membersWithRoles = members.map(({ user: { id: userId, ...user }, ...member}) => {
                return {
                    ...user,
                    ...member,
                    userId
                }
            })

            return reply.send({ members: membersWithRoles })
        }
    )
}
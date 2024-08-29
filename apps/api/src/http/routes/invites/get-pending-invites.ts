import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";

export async function getPendingInvites(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/peding-invites',
        {
            schema: {
                tags: ['invites'],
                summary: 'Get all user pending invites.',
                security: [{ bearerAuth: [] }],
                response: {
                    200: z.object({
                        invites: z.object({
                            
                        })
                    })
                }
            }
        },
        async (request) => {
            const userId = await request.getCurrentUserId()

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if(!user) {
                throw new BadRequestError('User not found.')
            }

            const invites = await prisma.invite.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true
                        }
                    },
                    organization: {
                        select: {
                            name: true
                        }
                    }
                },
                where: {
                    email: user.email
                }
            })

            return { invites }
        }
    )
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "@/ilb/prisma";

import { auth } from '@/http/middlewares/auth'
import { organizationSchema } from "@cbsaas/auth";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { BadRequestError } from "../_erros/bad-request-error";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { text } from "stream/consumers";


export async function transferOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
        '/organization/:slug/owner',
        {
            schema: {
                tags: ['organizations'],
                summary: 'Transfer organizaitons ownership',
                security: [{ bearerAuth: [] }],
                body: z.object({
                    transferToUserId: z.string().uuid()
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params

            const userId = await request.getCurrentUserId()
            const { membership, organization } = await request.getUserMembership(slug)


            const authOrganization = organizationSchema.parse(organization)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('transfer_ownership', authOrganization)) {
                throw new UnauthoraziedError(`You're not allowed to transfer this organization ownership`)
            }

            const { transferToUserId } = request.body

            const transferToMembership = await prisma.member.findUnique({
                where: {
                    organizationId_userId: {
                        organizationId: organization.id,
                        userId: transferToUserId
                    }
                }
            })

            if(!transferToMembership) {
                throw new BadRequestError('Target yser is not a member of this organization.')
            }

            await prisma.member.update({
                where: {
                    organizationId_userId: {
                        organizationId: organization.id,
                        userId: transferToUserId,
                    },
                },
                data: {
                    role: 'ADMIN'
                }
            })

            await prisma.organization.update({
                where: { id: organization.id },
                data: { ownerId: transferToUserId }
            })

            await prisma.$transaction([
                prisma.member.update({
                    where: {
                        organizationId_userId: {
                            organizationId: organization.id,
                            userId: transferToUserId,
                        }
                    },
                    data: {
                        role: 'ADMIN'
                    },
                }),
                prisma.organization.update({
                    where: { id: organization.id },
                    data: { ownerId: transferToUserId }
                })
            ])

            
            return reply.status(204).send()
        }
    )
}
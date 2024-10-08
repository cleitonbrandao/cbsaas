import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "@/http/middlewares/auth";
import { z } from 'zod';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
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
                security: [{ bearerAuth: [] }],
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
            const { slug, memberId } = request.params
            const userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)
            
            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('update', 'User')){
                throw new UnauthoraziedError(`You're not allowed update this member.`)
            }

            const { role } = request.body

            await prisma.member.update({
                where: {
                    id: memberId,
                    organizationId: organization.id
                },
                data:{
                    role
                }
            })
            
            return reply.status(204).send()
        }
    )
}
import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { array, z } from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";

export async function revokeInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organizations/:slug/invites/:inviteId',
        {
            schema: {
                tags: ['invites'],
                summary: 'Revoke an invite.',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string(),
                    inviteId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug, inviteId } = request.params
            const userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('delete', 'Invite')){
                throw new UnauthoraziedError(`You're not allowed to delete an invite.`)
            }

            const invite = await prisma.invite.findUnique({
                where: {
                    id: inviteId
                }
            })

            if(!invite){
                throw new BadRequestError('Invite not found.')
            }

            await prisma.invite.delete({
                where: {
                    id: inviteId,
                    organizationId: organization.id
                }
            })

            return reply.status(204).send()
        }
    )
}
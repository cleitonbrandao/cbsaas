import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";

export async function rejectInvite(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
        '/invites/:inviteId/reject',
        {
            schema: {
                tags: ['invites'],
                summary: 'Reject a invite',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    inviteId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()
            const { inviteId } = request.params
            
            const invite = await prisma.invite.findUnique({
                where: {
                    id: inviteId
                }
            })

            if(!invite){
                throw new BadRequestError('Invite not found.')
            }
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if(!user) {
                throw new BadRequestError('User not found.')
            }

            if(invite.email !== user.email) {
                throw new BadRequestError('This invite belongs to another user.')
            }

            await prisma.invite.delete({
                where: {
                    id: inviteId
                }
            })

            return reply.status(204).send()
        }
    )
}
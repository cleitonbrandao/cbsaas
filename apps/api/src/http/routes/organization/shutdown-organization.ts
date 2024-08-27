import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { organizationSchema } from "@cbsaas/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function shutdownOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organizations/:slug',
        {
            schema: {
                tags: ['organizations'],
                summary: 'Shutdown organization',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    204: z.null()
                }
            },
        },
        async (request, reply) => {
            const { slug } = request.params
            const userId = await request.getCurrentUserId()
            const { membership, organization } = await request.getUserMembership(slug)

            const authOrganization = organizationSchema.parse(organization)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('delete', authOrganization)) {
                throw new UnauthoraziedError(`You're not allowed to shutdown this organization`)
            }

            await prisma.organization.delete({
                where: {
                    id: organization.id
                }
            })

            return reply.status(204).send()
        }
    )
}
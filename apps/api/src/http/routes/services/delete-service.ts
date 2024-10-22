import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";


export async function deleteService(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organizations/:slug/services/:serviceId',
        {
            schema: {
                tags: ['services'],
                summary: 'Delete a service',
                security: [{ bearerAuth: []}],
                params: z.object({
                    slug: z.string(),
                    serviceId: z.string().uuid()
                }),
                response: {
                    200: z.null()
                }
            }
        },
        async (request, reply) => {
            const {slug, serviceId} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            const service = await prisma.service.findUnique({
                where: {
                    id: serviceId,
                    organizationId: organization.id
                }
            })

            if(!service) {
                throw new BadRequestError('Service not found');
            }

            // const aithService = productSchema.parse(organization)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('delete', authService)) {
            //     throw new UnauthoraziedError(`You're not allowed to delete this service`)
            // }

            await prisma.service.delete({
                where: {
                    id: serviceId
                }
            })

            return reply.status(204).send()
        }
    )
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { getUserPermissions } from '../../../utils/get-user-permissions';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";
import { auth } from "@/http/middlewares/auth";

export async function getService(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/services/:serviceId',
        {
            schema: {
                tags: ['services'],
                summary: 'Get service details',
                security: [{ bearerAuth: []}],
                params: z.object({
                    slug: z.string(),
                    serviceId: z.string().uuid()
                }),
                response: {
                    200: z.object({
                        service: z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            description: z.string().nullable(),
                            price: z.number().nullable(),
                            price_cost: z.number().nullable(),
                            created_at: z.date()
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const { slug: orgSlug, serviceId } = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(orgSlug)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('get', 'Service')) {
            //     throw new UnauthoraziedError(`You're not allowed see this service.`)
            // }

            const service = await prisma.service.findUnique({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    price_cost: true,
                    created_at: true
                },
                where: {
                    id: serviceId
                }
            })

            if(!service) {
                throw new BadRequestError('Service not found.')
            }

            return reply.send({ service })
        }
    )
}
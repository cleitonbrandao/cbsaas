import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { getMemebership } from "../organization/get-membership";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { auth } from "@/http/middlewares/auth";

export async function getServices(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizaitons/:slug/services',
        {
            schema: {
                tags: ['services'],
                summary: 'Get all organization services',
                security: [{ bearerAuth: []}],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        services: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                description: z.string().nullable(),
                                price: z.number().nullable(),
                                price_cost: z.number().nullable(),
                                created_at: z.date()
                            })
                        )
                    })
                }
            }
        },
        async (request, reply) => {
            const {slug} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)
 
            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('get', 'Service')) {
            //     throw new UnauthoraziedError(`You're not allowed see this services.`)
            // }

            const services = await prisma.service.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    price_cost: true,
                    created_at: true
                },
                where: {
                    organizationId: organization.id
                },
                orderBy: {
                    created_at: 'desc'
                }
            })

            return reply.send({ services })
        }
    )
}
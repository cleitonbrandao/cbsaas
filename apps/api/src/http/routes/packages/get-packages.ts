import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function getPackages(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/packages',
        {
            schema: {
                tags: ['packages'],
                summary: 'Get all organizations packages',
                security: [{bearerAuth: []}],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        packages: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                description: z.string().nullable(),
                                price: z.number().nullable(),
                                created_at: z.date(),
                                products: z.array(
                                    z.object({
                                        id: z.string().uuid(),
                                        name: z.string(),
                                        description: z.string().nullable(),
                                        price: z.number().nullable(),
                                        price_cost: z.number().nullable(),
                                        created_at: z.date()
                                    })
                                ),
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
                        )
                    })
                }
            }
        }, async (request, reply) => {
            const {slug} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('get', 'Package')) {
            //     throw new UnauthoraziedError(`You're not allowed to see organizations packages`)
            // }

            const packages = await prisma.package.findMany({
                where: {
                    organizationId: organization.id
                },
                include: {
                    products: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            price_cost: true,
                            created_at: true
                        }
                    },
                    services: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            price_cost: true,
                            created_at: true
                        }
                    }
                }
            })

            return reply.send({packages})
        }
    )
}
import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function getProducts(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/products',
        {
            schema: {
                tags: ['products'],
                summary: 'Get all organization products',
                security: [{ bearerAuth: []}],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        products: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                description: z.string().nullable(),
                                price: z.number().nullable(),
                                price_cost: z.number().nullable()
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

            // if(cannot('get', 'Product')){
            //     throw new UnauthoraziedError(`You're not allowed to see organization products`);
            // }

            const products = await prisma.product.findMany({
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

            return reply.send({ products })
        }
    )
}
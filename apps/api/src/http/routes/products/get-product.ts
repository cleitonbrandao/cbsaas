import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";
import { auth } from "@/http/middlewares/auth";

export async function getProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .get(
            '/organizations/:slug/products/:productId',
            {
                schema: {
                    tags: ['products'],
                    summary: 'Get product details',
                    security: [{ bearerAuth: []}],
                    params: z.object({
                        slug: z.string(),
                        productId: z.string().uuid()
                    }),
                    response: {
                        200: z.object({
                            product: z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                description: z.string().nullable(),
                                price: z.number(),
                                price_cost: z.number(),
                                created_at: z.date()
                            })
                        })
                    }
                }
            },
            async (request, reply) => {
                const {slug: orgSlug, productId} = request.params
                const userId = await request.getCurrentUserId()
                const {organization, membership} = await request.getUserMembership(orgSlug)

                // const {cannot} = getUserPermissions(userId, membership.role)

                // if(cannot('get', 'Product')) {
                //     throw new UnauthoraziedError(`You're not allowed see this product`)
                // }

                const product = await prisma.product.findUnique({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                        price_cost: true,
                        created_at: true
                    },
                    where: {
                        id: productId
                    }
                })

                if(!product) {
                    throw new BadRequestError('Product not found')
                }

                return reply.send({ product })
            }
        )
}
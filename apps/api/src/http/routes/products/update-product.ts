import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { productSchema } from "@cbsaas/auth/src/models/product";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { parseCurrency } from "@/utils/parse-currency-monetary";

export async function updateProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organizations/:slug/products/:productId',
        {
            schema: {
                tags: ['products'],
                summary: 'Update a product',
                security: [{ bearerAuth: []}],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullish(),
                    price: z.string(),
                    price_cost: z.string()
                }),
                params: z.object({
                    slug: z.string(),
                    productId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug, productId} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            const product = await prisma.product.findUnique({
                where: {
                    id: productId
                }
            })

            if(!product) {
                throw new BadRequestError('Product not found')
            }

            // const {cannot} = getUserPermissions(userId, membership.role)
            // const authProduct = productSchema.parse(product)

            // if(cannot('update', authProduct)){
            //     throw new UnauthoraziedError(`You're not allowed to update this product`)
            // }

            const {name, description, price, price_cost} = request.body

            await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    name,
                    description,
                    price: price ? parseCurrency(price) : 0,
                    price_cost: price_cost ? parseCurrency(price_cost) : 0
                }
            })

            return reply.status(204).send()
        }
    )
}
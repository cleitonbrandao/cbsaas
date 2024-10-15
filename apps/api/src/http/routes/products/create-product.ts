import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function createProduct(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
        '/organizations/:slug/products',
        {
            schema: {
                tags: ['products'],
                summary: 'Create a New Product.',
                security: [{ bearerAuth: []}],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullish(),
                    price: z.string().nullish(),
                    price_cost: z.string().nullish(),
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    201: z.object({
                        productId: z.string().uuid()
                    })
                }
            },
        },
        async (request, reply) => {
            const { slug } = request.params
            const userId  = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            // const { cannot } =  getUserPermissions(userId, membership.role)

            // if(cannot('create', 'Product')) {
            //     throw new UnauthoraziedError(`You're not allowed to create new proejct.`)
            // }

            const {name, description, price, price_cost} = request.body

            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    price: price ? parseFloat(price) : 0,
                    price_cost: price_cost ? parseFloat(price_cost) : 0,
                    organizationId: organization.id,
                }
            })


            return reply.status(201).send({ productId: product.id })
        }
    )
}
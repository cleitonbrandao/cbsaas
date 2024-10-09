import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';

export async function createProduct(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
        '/product',
        {
            schema: {
                tags: ['products'],
                summary: 'Create a New Product.',
                security: [{ bearerAuth: []}],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullish(),
                    price: z.string().optional(),
                    price_cost: z.string().optional(),
                }),
                response: {
                    201: z.object({
                        productId: z.string().uuid()
                    })
                }
            },
        },
        async (request, reply) => {
            const {name, description, price, price_cost} = request.body
            const userId = await request.getCurrentUserId()
            return reply.status(201).send()
        }
    )
}
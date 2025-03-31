import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { register } from "module";
import {z} from 'zod';
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";
import { parseCurrency } from "@/utils/parse-currency-monetary";

export async function updateService(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organizations/:slug/services/:id',
        {
            schema: {
                tags: ['services'],
                summary: 'Updated a service',
                security: [{ bearerAuth: []}],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullable(),
                    price: z.string(),
                    price_cost: z.string()
                }),
                params: z.object({
                    slug: z.string(),
                    id: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const {slug, id} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            const service = await prisma.service.findUnique({
                where: {
                    id: id
                }
            })

            if(!service) {
                throw new BadRequestError('Service not found.')
            }

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('update', 'Service')) {
            //     throw new UnauthoraziedError(`You're not allowed update this service.`)
            // }
            const {name, description, price, price_cost} = request.body
            await prisma.service.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description,
                    price: price ? parseCurrency(price): 0,
                    price_cost: price_cost ? parseCurrency(price_cost) : 0
                }
            })

            return reply.status(204).send()
        }
    )
}
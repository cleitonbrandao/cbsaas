import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { getCurrentOrg } from '../../../../../web/src/auth/auth';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { parseCurrency } from "@/utils/parse-currency-monetary";

export default async function createService(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
        '/organizations/:slug/services',
        {
            schema: {
                tags: ['services'],
                summary: 'Create a service',
                security: [{ bearerAuth: [] }],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullish(),
                    price: z.string().nullish(),
                    price_cost: z.string().nullish()
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                  201: z.object({
                    serviceId: z.string().uuid()
                  })  
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params
            const userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)
            
            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('create', 'Service')) {
            //     throw new UnauthoraziedError(`You're not allowed to create new project`)
            // }

            const {name, description, price, price_cost} = request.body

            const service = await prisma.service.create({
                data: {
                    name,
                    description,
                    price: price ? parseCurrency(price) : 0,
                    price_cost: price_cost ? parseCurrency(price_cost): 0,
                    organizationId: organization.id
                }
            })

            return reply.status(201).send({ serviceId: service.id })
        }
    )
}
import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { getUserPermissions } from '../../../utils/get-user-permissions';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";

export async function getPackage(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/packages/:id',
        {
            schema: {
                tags: ['packages'],
                summary: 'Get package details',
                security: [{bearerAuth: []}],
                params: z.object({
                    slug: z.string(),
                    id: z.string().uuid()
                }),
                response: {
                    200: z.object({
                        package: z.object({
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
                    })
                }
            }
        },
        async (request, reply) => {
            const {slug, id: packagetId} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            // const {cannot} = await request.getUserPermissions(userId, membership.role)

            // if(cannot('get', 'Package')){
            //     throw new UnauthoraziedError(`You're not allowed see this package`)
            // }
            const registerPackage = await prisma.package.findUnique({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    created_at: true,
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
                },
                where: {
                    id: packagetId
                }
            })

            if(!registerPackage) {
                throw new BadRequestError('Package not found.')
            }

            reply.send({package: registerPackage})
        }
    )
}
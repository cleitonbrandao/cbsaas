import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function searchProducts(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizations/:slug/search/:query',
        {
            schema: {
                tags: ['searchs'],
                summary: 'Search all organizations products, services and packages.',
                security: [{bearerAuth: []}],
                params: z.object({
                    slug: z.string(),
                    query: z.string()
                }),
                response: {
                    200: z.object({
                        products: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                            })
                        ),
                        services: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                            })
                        ),
                        packages: z.array(
                            z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                            })
                        )
                    })
                }
            }
        },
        async (request, reply) => {
            const {slug, query} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('get', 'Product')) {
            //     throw new UnauthoraziedError(`You're not allowed this see organization products.`)
            // }
            
            const [products, services, packages] = await prisma.$transaction([
                prisma.product.findMany({
                    where: {
                        organizationId: organization.id,
                        name: { contains: query, mode: 'insensitive' },
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                    take: 3, 
                }),
                prisma.service.findMany({
                    where: {
                        organizationId: organization.id,
                        name: { contains: query, mode: 'insensitive' },
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                    take: 3, 
                }),
                prisma.package.findMany({
                    where: {
                        organizationId: organization.id,
                        name: { contains: query, mode: 'insensitive' },
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                    take: 3, 
                })
            ]);
            
            return reply.send({
                products,
                services,
                packages,
            });
             
        }
    )
}
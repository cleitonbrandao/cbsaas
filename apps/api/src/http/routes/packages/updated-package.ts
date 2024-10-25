import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";
import { parseCurrency } from "@/utils/parse-currency-monetary";


export async function updatedPackage(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organizations/:slug/packages/:id',
        {
            schema: {
                tags: ['packages'],
                summary: 'Update a package',
                security: [{bearerAuth: []}],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullable(),
                    price: z.string().regex(/^\d+(\.\d{1,2})?$/),
                    addProducts: z.array(
                        z.object({
                            productId: z.string().uuid()
                        })
                    ).optional(),
                    removeProducts: z.array(
                        z.object({
                            productId: z.string().uuid()
                        })
                    ),
                    addServices: z.array(
                        z.object({
                            serviceId: z.string().uuid()
                        })
                    ).optional(),
                    removeServices: z.array(
                        z.object({
                            serviceId: z.string().uuid()
                        })
                    ).optional()
                }),
                params: z.object({
                    slug: z.string(),
                    id: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const {slug, id: packageId} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('update', 'Package')){
            //     throw new UnauthoraziedError(`You're not allowed update this package`)
            // }

            const registerPackage = await prisma.package.findUnique({
                where: {
                    id: packageId
                }
            })

            if(!registerPackage) {
                throw new BadRequestError('Package not found.')
            }

            const {name, description, price, addProducts, removeProducts, addServices, removeServices} = request.body

            await prisma.package.update({
                where: { id: packageId},
                data: {
                    name,
                    description,
                    price: price ? parseCurrency(price) : 0,
                    products: {
                        connect: addProducts ? addProducts.filter((product) => product !== undefined).map(({productId}) => ({id: productId})) : [],
                        disconnect: addProducts ? addProducts.filter((product) => product !== undefined).map(({productId}) => ({id: productId})) : []
                    },
                    services: {
                        connect: addServices ? addServices.filter((service) => service !== undefined).map(({serviceId}) => ({id: serviceId})) : [],
                        disconnect: removeServices ? removeServices.filter((service) => service !== undefined).map(({serviceId}) => ({id: serviceId})) : []
                    }
                } 
            })

            reply.status(204).send();
        }
    )
}
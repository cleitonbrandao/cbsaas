import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";
import { parseCurrency } from "@/utils/parse-currency-monetary";


export async function createPackage(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
        '/organizations/:slug/packages',
        {
            schema: {
                tags: ['packages'],
                summary: 'Create a package',
                security: [{bearerAuth: []}],
                body: z.object({
                    name: z.string().min(4, {message: 'Please, include at least 4 caracters.'}),
                    description: z.string().nullish(),
                    price: z.string().refine(value => !isNaN(parseFloat(value)), {
                        message: "Price must be a valid number"
                    }),
                    items: z.array(
                        z.object({
                            productIds: z.array(z.string().uuid()).optional(),
                            serviceIds: z.array(z.string().uuid()).optional()
                        }).refine(data => (data.productIds?.length || 0) > 0 || (data.serviceIds?.length || 0) > 0, {
                            message: 'At least one product or service must be added to the package'
                        })
                    )
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    201: z.object({
                        packageId: z.string().uuid()
                    })
                }
            }
        },
        async (request, reply) => {
            const {slug} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership (slug)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('create', 'Package')) {
            //     throw new UnauthoraziedError(`You're not allowed to create package`)
            // }
            
            const {name, description, price, items} = request.body
            const productIds = items.flatMap(item => item.productIds || [])
            const serviceIds = items.flatMap(item => item.serviceIds || [])
            const newPackage = await prisma.package.create({
                data: {
                    name,
                    description,
                    price: price ? parseCurrency(price) : 0,
                    organizationId: organization.id,
                    products: {
                        connect: productIds.map((id) => ({id}))
                    },
                    services: {
                        connect: serviceIds.map((id) => ({id}))
                    }
                }
            })

            reply.status(201).send({packageId: newPackage.id})
        }
    )
}
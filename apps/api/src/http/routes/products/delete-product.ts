import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { productSchema } from '../../../../../../packages/auth/src/models/product';

export async function deleteProduct(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organizations/:slug/products/:productId',
        {
            schema: {
                tags: ['products'],
                summary: 'Delete a product',
                security: [{ bearerAuth: []}],
                params: z.object({
                    slug: z.string(),
                    productId: z.string().uuid()
                }),
                response: {
                    200: z.null()
                }
            }
        },
        async (request, reply) => {
            const {slug, productId} = request.params
            const userId = await request.getCurrentUserId()
            const {organization, membership} = await request.getUserMembership(slug)

            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                    organizationId: organization.id
                }
            })

            if(!product) {
                throw new BadRequestError('Product not found');
            }

            // const authProduct = productSchema.parse(organization)

            // const {cannot} = getUserPermissions(userId, membership.role)

            // if(cannot('delete', authProduct)) {
            //     throw new UnauthoraziedError(`You're not allowed to delete this product`)
            // }

            await prisma.product.delete({
                where: {
                    id: productId
                }
            })

            return reply.status(204).send()
        }
    )
}
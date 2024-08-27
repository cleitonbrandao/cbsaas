import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "@/ilb/prisma";

import { auth } from '@/http/middlewares/auth'
import { organizationSchema } from "@cbsaas/auth";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { BadRequestError } from "../_erros/bad-request-error";
import { createSlug } from "@/utils/create-slug";
import { getUserPermissions } from "@/utils/get-user-permissions";


export async function updateOrganization(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organization/:slug',
        {
            schema: {
                tags: ['organizations'],
                summary: 'Update organizaitons details',
                security: [{ bearerAuth: [] }],
                body: z.object({
                    name: z.string(),
                    domain: z.string().nullish(),
                    shouldAttachUserByDomain: z.boolean().optional()
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { slug } = request.params

            const userId = await request.getCurrentUserId()
            const { membership, organization } = await request.getUserMembership(slug)

            const { name, domain, shouldAttachUserByDomain } = request.body

            const authOrganization = organizationSchema.parse(organization)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('update', authOrganization)) {
                throw new UnauthoraziedError(`You're not allowed to update this organization`)
            }
            
            if(domain) {
                const organizationByDomain = await prisma.organization.findFirst({
                    where: {
                        domain,
                        id: {
                            not: organization.id,
                        }
                    }
                })

                if(organizationByDomain) {
                    throw new BadRequestError(
                        'Another organization with same domaind already exists.'
                    )
                }
            }

            await prisma.organization.update({
                where: {
                    id: organization.id
                },
                data: {
                    name,
                    domain,
                    shouldAttachUserByDomain,
                }
            })

            return reply.status(204).send()
        }
    )
}
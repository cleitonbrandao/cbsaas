import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma } from "@/ilb/prisma";

export async function getOrganizationBilling(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        '/organizaitons/:slug/billing',
        {
            schema: {
                tags: ['billing'],
                summary: 'Get billing information from organization.',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    200: z.object({
                        billing: z.object({
                            seats: z.object({
                                amount: z.number(),
                                unit: z.number(),
                                price: z.number(),
                            }),
                            projects: z.object({
                                amount: z.number(),
                                unit: z.number(),
                                price: z.number()
                            }),
                            total: z.number()
                        })
                    })
                }
            }
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId()
            const { slug } = request.params
            const { organization, membership } = await request.getUserMembership(slug)

            const { cannot } = getUserPermissions(userId, membership.role)

            if(cannot('get', 'Billing')){
                throw new UnauthoraziedError(`You're not allowed to get billing details from this organization.`)
            }

            const [amounthOfMembers, amounthOfProjects] = await Promise.all([
                prisma.member.count({
                    where: {
                        organizationId: organization.id,
                        role: { not: 'BILLING' },
                    },
                }),
                prisma.project.count({
                    where: {
                        organizationId: organization.id,
                    },
                }),
            ])

            return {
                billing: {
                    seats: {
                        amount: amounthOfMembers,
                        unit: 10,
                        price: amounthOfMembers * 10
                    },
                    projects: {
                        amount: amounthOfProjects,
                        unit: 20,
                        price: amounthOfProjects * 20
                    },
                    total: amounthOfMembers * 10 + amounthOfProjects * 20
                }
            }
        }
    )
}
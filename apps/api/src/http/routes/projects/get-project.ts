import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { z } from 'zod';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { projectSchema } from "@cbsaas/auth";
import { BadRequestError } from "../_erros/bad-request-error";

export async function getProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .get(
            '/organizations/:orgSlug/projects/:projectSlug',
            {
                schema: {
                    tags: ['projects'],
                    summary: 'Get a project details',
                    security: [{ barearAuth: [] }],
                    params: z.object({
                        orgSlug: z.string(),
                        projectSlug: z.string().uuid()
                    }),
                    response: {
                        200: z.object({
                            project: z.object({
                                id: z.string().uuid(),
                                name: z.string(),
                                description: z.string(),
                                slug: z.string(),
                                avatarUrl: z.string().nullable(),
                                organizationId: z.string().uuid().nullable(),
                                ownerId: z.string().nullable(),
                                owner: z.object({
                                    id: z.string().uuid(),
                                    name: z.string().nullable(),
                                    avatarUrl: z.string().nullable()
                                })
                            })
                        })
                    }
                }
            },
            async (request, reply) => {
                const { orgSlug, projectSlug } = request.params
                const userId = await request.getCurrentUserId()
                const { organization, membership } = await request.getUserMembership(orgSlug)

                const { cannot } = getUserPermissions(userId, membership.role)

                const project = await prisma.project.findUnique({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        slug: true,
                        ownerId: true,
                        avatarUrl: true,
                        organizationId: true,
                        owner: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true
                            }
                        }
                    },
                    where: {
                        slug: projectSlug,
                        organizationId: organization.id
                    }
                })

                if(!project) {
                    throw new BadRequestError('Porject not found')
                }

                const authProject = projectSchema.parse(project)

                if(cannot('get', authProject)) {
                    throw new UnauthoraziedError(`You're not allowed see this project.`)
                }

                return reply.status(200).send({ project })
            })    
}
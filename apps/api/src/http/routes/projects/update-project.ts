import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/ilb/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { BadRequestError } from "../_erros/bad-request-error";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { projectSchema } from "@cbsaas/auth";

export async function updateProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
        '/organizations/:slug/projects/:projectId', 
        {
            schema: {
                tags: ['projects'],
                summary: 'Update a project',
                security: [{ bearerAuth: [] }],
                body: z.object({
                    name: z.string(),
                    description: z.string()
                }),
                params: z.object({
                    slug: z.string(),
                    projectId: z.string().uuid()
                }),
                response: {
                    204: z.null()
                }
            }
        }, 
        async (request, reply) => {
            const { slug, projectId } = request.params
            const userId = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            const project = await prisma.project.findUnique({
                where: {
                    id: projectId,
                    organizationId: organization.id
                }
            })

            if(!project) {
                throw new BadRequestError('Project not found.')
            }

            const { cannot } = getUserPermissions(userId, membership.role)
            const authPorject = projectSchema.parse(project)

            if(cannot('update', authPorject)) {
                throw new UnauthoraziedError(`You're not allowed to update this project`)
            }

            const { name, description } = request.body

            await prisma.project.update({
                where: {
                    id: projectId
                },
                data: {
                    name, 
                    description
                }
            })

            return reply.status(204).send()
        })
}
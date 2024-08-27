import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { projectSchema } from "@cbsaas/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { prisma  } from "@/ilb/prisma";
import { BadRequestError } from "../_erros/bad-request-error";

export async function deleteProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organization/:slug/projects/:projectId',
        {
            schema: {
                tags: ['projects'],
                summary: 'Delete a project',
                security: [{ bearerAuth: [] }],
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

            if(!project){
                throw new BadRequestError('Project not found')
            }
            const authProject = projectSchema.parse(organization)


            const { cannot } = getUserPermissions(userId, membership.role)
            
            if(cannot('delete', authProject)){
                throw new UnauthoraziedError(`You're not allowed to delete this project`)
            }

            await prisma.project.delete({
                where: {
                    id: projectId
                }
            })

            return reply.status(204).send()
        })
}
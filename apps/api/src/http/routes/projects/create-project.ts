import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from '@/ilb/prisma';
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthoraziedError } from "../_erros/unauthorized-error";
import { createSlug } from "@/utils/create-slug";

export async function createProject(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).post(
        '/organizations/:slug/projects', 
        {
            schema: {
                tags: ['projects'],
                summary: 'Create a project',
                security: [{ bearerAuth: [] }],
                body: z.object({
                    name: z.string(),
                    description: z.string().nullish(),
                }),
                params: z.object({
                    slug: z.string()
                }),
                response: {
                    201: z.object({
                        projectId: z.string().uuid()
                    })
                }
            }
        }, 
        async (request, reply) => {
            const { slug } = request.params
            const userId  = await request.getCurrentUserId()
            const { organization, membership } = await request.getUserMembership(slug)

            const { cannot } =  getUserPermissions(userId, membership.role)

            if(cannot('create', 'Project')) {
                throw new UnauthoraziedError(`You're not allowed to create new proejct.`)
            }

            const { name, description } = request.body

            const project = await prisma.project.create({
                data: {
                    name,
                    slug: createSlug(name),
                    description,
                    organizationId: organization.id,
                    ownerId: userId,
                }
            })

            return reply.status(201).send({ projectId: project.id })
        })    
}
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

import { prisma } from '@/ilb/prisma'
import { BadRequestError } from "../_erros/bad-request-error";
import { auth } from "@/http/middlewares/auth";

export async function requestPasswordRecover(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/password/recover', 
        {
        schema: {
            tags: ['auth'],
            summary: 'Recovery password',
            body: z.object({
                email: z.string().email(),

            })
        },
    }, 
    async (request, reply) => {},
)}
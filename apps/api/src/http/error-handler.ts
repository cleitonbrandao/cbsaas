import { error } from "console";
import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequestError } from "./routes/_erros/bad-request-error";
import { UnauthoraziedError } from "./routes/_erros/unauthorized-error";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if( error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            errors: error.flatten().fieldErrors,
        })
    }

    if(error instanceof BadRequestError) {
        return reply.status(400).send({
            message: error.message,
        })
    }

    if(error instanceof UnauthoraziedError) {
        return reply.status(401).send({
            message: error.message,
        })
    }

    console.log(error)

    //send error to some observability platform

    return reply.status(500).send({message: 'Internal server error.'})
}
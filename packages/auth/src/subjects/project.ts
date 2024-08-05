import { z } from 'zod'
import { projectSchema } from '../models/project'

export const projectSubject = z.tuple([
    z.union([
        z.literal('manager'),
        z.literal('get'),
        z.literal('create'),
        z.literal('update'),
        z.literal('delete'),
    ]),
    z.union([z.literal('Project'), projectSchema])
])
export type PorjectSubject = z.infer<typeof projectSubject>
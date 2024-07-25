import { z } from 'zod'

export const projectSubject = z.tuple([
    z.union([
        z.literal('manager'),
        z.literal('get'),
        z.literal('create'),
        z.literal('update'),
        z.literal('delete'),
    ]),
    z.literal('Project')
])
export type PorjectSubject = z.infer<typeof projectSubject>
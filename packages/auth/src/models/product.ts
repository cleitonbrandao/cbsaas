import { z } from 'zod'

export const productSchema = z.object({
    __typename: z.literal('Product').default('Product'),
    id: z.string(),
    organizationId: z.string()
})

export type Project = z.infer<typeof productSchema>
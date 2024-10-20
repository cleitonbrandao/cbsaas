import { z } from 'zod'

export const productSchema = z.object({
    __typename: z.literal('Product').default('Product'),
    id: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    price: z.string().nullish(),
    price_cost: z.string().nullish(),
    created_at: z.date()
})

export type Project = z.infer<typeof productSchema>
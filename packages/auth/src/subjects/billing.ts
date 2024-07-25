import { z } from 'zod'

export const billingSubject = z.tuple([
    z.union([
        z.literal('manager'),
        z.literal('get'),
        z.literal('export'),
        z.literal('delete'),
    ]),
    z.literal('billing')
])
export type BillingSubject = z.infer<typeof billingSubject>
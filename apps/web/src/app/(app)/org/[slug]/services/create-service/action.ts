'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { getCurrentOrg } from '@/auth/auth'
import { revalidateTag } from 'next/cache'
import { CreateService } from 'http/service/create-service'
import { RemoveService } from 'http/service/delete-service'
import { UpdatedService } from 'http/service/updated-service'

const serviceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(4, {message: 'Pleasw, include at least 4 caracters.'}),
    description: z.string().nullish(),
    price: z.string().nullish(),
    price_cost: z.string().nullish()
})

export type ServiceSchema = z.infer<typeof serviceSchema>

export async function createProductAction(data: FormData) {
    const currentOrg = getCurrentOrg();
    const result = serviceSchema.safeParse(Object.fromEntries(data));
    console.log(result.error)

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors} 
    }

    const {name, description, price, price_cost} = result.data

    try{
        await CreateService({
            org: getCurrentOrg()!,
            name,
            description: description ?? undefined,
            price: price ?? undefined,
            price_cost: price_cost ?? undefined
        })

        revalidateTag(`${currentOrg}/products`)
    }catch(error) {
        if(error instanceof HTTPError) {
            const {message} = await error.response.json()

            return {success: false, message, errors: null}
        }

        console.error(error)
    }

    return {
        success: true, 
        message: 'Successfuly create the project.', 
        errors: null
    }
}

export async function removeServiceAction(serviceId: string) {
    const currentOrg = getCurrentOrg();

    await RemoveService({org: currentOrg!, serviceId})

    revalidateTag(`${currentOrg}/products`);
}

export async function updatedServiceAction(data: FormData) {

    const currentOrg = getCurrentOrg()

    const result = serviceSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors}
    }
    const { id, name, description, price, price_cost} = result.data

    try{
        await UpdatedService({
            org: currentOrg!,
            id: id!,
            name,
            description: description ?? undefined,
            price: price ?? undefined,
            price_cost: price_cost ?? undefined
        })

        revalidateTag(`${currentOrg}/products`);
    }catch(err) {
        if(err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null}
        }
        console.error(err)

        return {
            success: false,
            message: 'Unexpect error, try again in a few minutes.',
            errors: null
        }
    }

    return { success: true, message: 'Successfully saved the organization.', errors: null }
}
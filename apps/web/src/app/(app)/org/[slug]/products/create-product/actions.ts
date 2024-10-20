'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { CreateProduct } from 'http/create-product'
import { getCurrentOrg } from '@/auth/auth'
import { revalidateTag } from 'next/cache'
import { removeProduct } from 'http/remove-product'
import { UpdateProduct } from 'http/updata-product'

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(4, {message: 'Pleasw, include at least 4 caracters.'}),
    description: z.string().nullish(),
    price: z.string().nullish(),
    price_cost: z.string().nullish()
})

export type ProductSchema = z.infer<typeof productSchema>

export async function createProductAction(data: FormData) {
    const currentOrg = getCurrentOrg();
    const result = productSchema.safeParse(Object.fromEntries(data));
    console.log(result.error)

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors} 
    }

    const {name, description, price, price_cost} = result.data

    try{
        await CreateProduct({
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

export async function removeProductAction(productId: string) {
    const currentOrg = getCurrentOrg();

    await removeProduct({org: currentOrg!, productId})

    revalidateTag(`${currentOrg}/products`);
}

export async function updateProductAction(data: FormData) {

    const currentOrg = getCurrentOrg()

    const result = productSchema.safeParse(Object.fromEntries(data))
    // console.log("dentro do updating", result.error)

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors}
    }

    const { id, name, description, price, price_cost} = result.data

    try{
        await UpdateProduct({
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
'use server'

import { HTTPError } from 'ky'
import {string, z} from 'zod'
import { CreateProduct } from 'http/create-product'
import { getCurrentOrg } from '@/auth/auth'
import { revalidateTag } from 'next/cache'
import { removeProduct } from 'http/remove-product'

const prodductSchema = z.object({
    name: string().min(4, {message: 'Pleasw, include at least 4 caracters.'}),
    description: z.string().optional(),
    price: z.string().optional(),
    price_cost: z.string().optional()
})

export async function createProductAction(data: FormData) {
    const currentOrg = getCurrentOrg();
    const result = prodductSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors} 
    }

    const {name, description, price, price_cost} = result.data

    try{
        await CreateProduct({
            org: getCurrentOrg()!,
            name,
            description,
            price,
            price_cost
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
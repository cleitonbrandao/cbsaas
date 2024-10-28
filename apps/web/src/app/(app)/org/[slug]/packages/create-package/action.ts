'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { CreateProduct } from 'http/create-product'
import { getCurrentOrg } from '@/auth/auth'
import { revalidateTag } from 'next/cache'
import { removeProduct } from 'http/remove-product'
import { UpdateProduct } from 'http/updata-product'
import { CreatePackage } from 'http/packages/create-pacage'
import { UpdatedPackage } from 'http/packages/updated-package'

const packageSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(4, { message: 'Please, include at least 4 characters.' }),
    description: z.string().nullish(),
    price: z.string().nullish(),
    items: z.array(
        z.object({
            productIds: z.array(z.string().uuid()).optional(),
            serviceIds: z.array(z.string().uuid()).optional(),
        })
    ).default([]).refine(items => items.length > 0, {
        message: 'At least one product or service must be added to the package.',
    })
})

const packageUpdatedSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(4, {message: 'Pleasw, include at least 4 caracters.'}),
    description: z.string().nullish(),
    price: z.string().refine(value => !isNaN(parseFloat(value)), {
        message: "Price must be a valid number"
    }).nullish(),
    addProducts: z.array(
        z.object({
            productId: z.string().uuid().optional(),
        })
    ).optional(),
    removeProducts: z.array(
        z.object({
            productId: z.string().uuid().optional()
        })
    ).nullable(),
    addServices: z.array(
        z.object({
            serviceId: z.string().uuid().optional()
        })
    ).optional(),
    removeServices: z.array(
        z.object({
            serviceId: z.string().uuid().optional()
        })
    ).nullable()

})

export type PackageSchema = z.infer<typeof packageSchema>

export async function createPackageAction(data: FormData) {
    const currentOrg = getCurrentOrg();
    const result = packageSchema.safeParse(Object.fromEntries(data));

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors
        console.log(errors)

        return {success: false, message: null, errors} 
    }

    const {name, description, price, items} = result.data

    try{
        await CreatePackage({
            org: getCurrentOrg()!,
            name,
            description: description ?? null,
            price: price ?? undefined,
            items
        })

        revalidateTag(`${currentOrg}/packages`)
    }catch(error) {
        if(error instanceof HTTPError) {
            const {message} = await error.response.json()

            return {success: false, message, errors: null}
        }

        console.error(error)
    }

    return {
        success: true, 
        message: 'Successfuly create the package.', 
        errors: null
    }
}

export async function removePackageAction(productId: string) {
    const currentOrg = getCurrentOrg();

    await removeProduct({org: currentOrg!, productId})

    revalidateTag(`${currentOrg}/packages`);
}

export async function updatePackageAction(data: FormData) {

    const currentOrg = getCurrentOrg()

    const result = packageUpdatedSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors}
    }
    const { id, name, description, price, addProducts, removeProducts, addServices, removeServices} = result.data

    try{
        await UpdatedPackage({
            org: currentOrg!,
            id: id!,
            name,
            description: description ?? null,
            price: price ?? undefined,
            addProducts: addProducts ?? undefined,
            removeProducts: removeProducts ?? null,
            addServices: addServices ?? undefined,
            removeServices: removeServices ?? null
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
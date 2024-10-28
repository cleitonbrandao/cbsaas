import { api } from "http/api-client"


interface CreatePackageRequest {
    org: string
    name: string
    description: string | null
    price?: string
    items: {
        productIds?: string[]
        serviceIds?: string[]
    }[]
}

type CreatePackageResponse = void
export async function CreatePackage({org, name, description, price, items}: CreatePackageRequest): Promise<CreatePackageResponse> {
    await api.post(`organizations/${org}/packages`, {
        json: {
            name,
            description,
            price,
            items
        }
    })
}
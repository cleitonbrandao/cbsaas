import { api } from "http/api-client"


interface UpdatedPackageRequest {
    id: string
    org: string
    name: string
    description: string | null
    price?: string
    addProducts: {
        productId?: string
    }[] | undefined
    removeProducts: {
        productId?: string
    }[] | null
    addServices: {
        serviceId?: string
    }[] | undefined
    removeServices: {
        serviceId?: string | undefined
    }[] | null
}

type UpdatedPackageResponse = void
export async function UpdatedPackage({org, id, name, description, price, addProducts, removeProducts, addServices, removeServices}: UpdatedPackageRequest): Promise<UpdatedPackageResponse> {
    await api.put(`organizations/${org}/packages/${id}`, {
        json: {
            name,
            description,
            price,
            addProducts,
            removeProducts,
            addServices,
            removeServices
        }
    })
}
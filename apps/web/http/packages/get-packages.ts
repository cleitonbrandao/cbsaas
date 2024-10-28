import { api } from "http/api-client";


interface PackageService {
    id: string
    name: string
    description: string | null
    price: string | null
    price_cost: string | null
    created_at: string
}[]
interface PackageProduct {
    id: string
    name: string
    description: string | null
    price: string | null
    price_cost: string | null
    created_at: string
}[]

interface GetPackagesResponse {
    packages: {
        id: string
        name: string
        description: string
        price: string
        created_at: string
        products: PackageProduct
        services: PackageService
    }[]
}

export async function GetPackages(org: string) {
    const result = await api.get(`organizations/${org}/packages`).json<GetPackagesResponse>()

    return result
}
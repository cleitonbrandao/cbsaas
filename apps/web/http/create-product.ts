import { api } from "./api-client";

interface CreateProductRequest {
    org: string
    name: string
    description?: string | null
    price?: string
    price_cost?: string
}

type CreateProductResponse = void

export async function CreateProduct({
    org, name, description, price, price_cost
}: CreateProductRequest): Promise<CreateProductResponse> {
    await api.post(`organizations/${org}/products`, {
        json: {
            name,
            description,
            price,
            price_cost
        }
    })
}
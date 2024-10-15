import { api } from "./api-client";

interface CreateProductRequest {
    org: string
    name: string
    description?: string
    price?: string
    price_cost?: string
}

type CreateProductResponse = void

export async function CreateProduct({
    org, name, description, price, price_cost
}: CreateProductRequest): Promise<CreateProductResponse> {
    await api.post(`organizations/${org}/product`, {
        json: {
            name,
            description,
            price,
            price_cost
        }
    })
}
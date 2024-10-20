import { json } from "stream/consumers"
import { api } from "./api-client"


interface UpdateProductRequest {
    org: string
    id: string
    name: string
    description: string | undefined
    price: string | undefined
    price_cost: string | undefined
}

type UpdateProductResponse = void

export async function UpdateProduct({org: slug, id, name, description, price, price_cost}: UpdateProductRequest): Promise<UpdateProductResponse> {
    await api.put(`organizations/${slug}/products/${id}`, {
        json: {
            slug,
            id,
            name,
            description,
            price,
            price_cost
        }
    })
}
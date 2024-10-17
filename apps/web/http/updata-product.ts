import { json } from "stream/consumers"
import { api } from "./api-client"


interface UpdateProductRequest {
    org: string
    productId: string
    name: string
    description: string | undefined
    price: string | undefined
    price_cost: string | undefined
}

export async function UpdateProduct({org, productId, name, description, price, price_cost}: UpdateProductRequest) {
    await api.put(`organizations/${org}/products/${productId}`, {
        json: {
            org,
            productId,
            name,
            description,
            price,
            price_cost
        }
    })
}
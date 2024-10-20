import { api } from "./api-client";
import { z } from 'zod';

interface GetProductRequest {
    org: string
    productId: string
}

interface GetProductResponse {
    product: {
        name: string
        id: string
        description: string | null
        price: string
        price_cost: string
        created_at: string
    }
}

export async function GetProduct({org, productId}: GetProductRequest) {
    const result = await api.get(`organizations/${org}/products/${productId}`).json<GetProductResponse>()
    
    return result
}
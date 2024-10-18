import { api } from "./api-client";
import { z } from 'zod';

interface GetProductRequest {
    org: string
    productId: string
}

interface GetProductResponse {
    product: {
        id: string
        name: string
        description: string | undefined
        price: string | undefined
        price_cost: string | undefined
        created_at: string
    }
}

export async function GetProduct({org, productId}: GetProductRequest) {
    const result = await api.get(`organizations/${org}/products/${productId}`).json<GetProductResponse>()
    
    return result
}
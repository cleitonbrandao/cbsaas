import { api } from "./api-client";

interface GetProductsResponse {
    products: {
        id: string,
        name: string,
        description: string,
        price: string,
        price_cost: string,
        created_at: string
    }[]
}

export async function getProducts(org: string) {
    const result = await api.get(`organizations/${org}/products`).json<GetProductsResponse>();

    return result;
}
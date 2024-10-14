import { api } from "./api-client";

interface CreateProductRequest {
    org: string
    name: string
    description: string
}

type CreateProductResponse = void

export async function CreateProduct({
    org, name, description
}: CreateProductRequest): Promise<CreateProductResponse> {
    await api.post(`organizations/${org}/product`, {
        json: {
            name,
            description
        }
    })
}
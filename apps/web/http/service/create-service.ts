import { api } from "http/api-client"

interface CreateServiceRequest {
    org: string
    name: string
    description?: string
    price?: string
    price_cost?: string
}

type CreateServiceResponse = void

export async function CreateService({
    org, name, description, price, price_cost
}: CreateServiceRequest): Promise<CreateServiceResponse> {
    await api.post(`organizations/${org}/services`, {
        json: {
            name,
            description,
            price,
            price_cost
        }
    })
}
import { api } from "http/api-client"

interface UpdatedServiceRequest {
    org: string
    id: string
    name: string
    description: string | undefined
    price: string | undefined
    price_cost: string | undefined
}

type UpdatedServiceResponse = void

export async function UpdatedService({org, id, name, description, price, price_cost}: UpdatedServiceRequest) {
    await api.put(`organizations/${org}/services/${id}`, {
        json: {
            org,
            id,
            name,
            description,
            price,
            price_cost
        }
    })
}
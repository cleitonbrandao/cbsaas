import { api } from 'http/api-client';

interface GetServiceResponse {
    services: {
        id: string
        name: string
        description: string | null
        price: string
        price_cost: string
        created_at: string
    }[]
}

export async function GetServices(org: string) {
    console.log("dentro da função getservices")
    const result = await api.get(`organizations/${org}/services`).json<GetServiceResponse>()

    return result
}
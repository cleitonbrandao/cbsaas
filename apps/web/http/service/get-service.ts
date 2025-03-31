import { api } from "http/api-client"

interface GetServiceRequest {
    org: string
    serviceId: string
}

interface GetServiceResponse {
    service: {
        id: string
        name: string
        description: string | null
        price: string
        price_cost: string
        created_at: string
    }
}

export async function GetService({ org, serviceId}: GetServiceRequest) {
    const result = await api.get(`organizations/${org}/services/${serviceId}`).json<GetServiceResponse>()

    return result
}
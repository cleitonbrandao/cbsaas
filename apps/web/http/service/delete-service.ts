import { api } from "http/api-client"

interface RemoveServiceRequest {
    org: string
    serviceId: string
}

export async function RemoveService({
    org, serviceId
}: RemoveServiceRequest) {
    await api.delete(`organizations/${org}/services/${serviceId}`)
}
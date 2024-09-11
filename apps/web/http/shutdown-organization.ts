import { api } from "./api-client";

interface ShuttdownOrganizationRequest {
    org: string
}

export async function ShuttdownOrganization({org}: ShuttdownOrganizationRequest) {
    const result = await api.delete(`organizations/${org}`)
}
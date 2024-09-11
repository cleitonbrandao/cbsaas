import { api } from "./api-client";

interface GetOrganizationResponse {
    organization: {
        id: string
        name: string
        slug: string
        domain: string | null
        shouldAttachUserByDomain: boolean
        avatarUrl: string | null
        createdAt: string
        updatedAt: string
        ownerId: string
    }
}
export async function GetOrganization(org: string) {
    const result = await api.get(`organizations/${org}`, {
        next: {
            tags: ['organizations'],
        }
    }).json<GetOrganizationResponse>()
    
    return result
}
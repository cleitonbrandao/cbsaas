import { api } from "./api-client";

interface CreateOrganizaitonRequest {
    name: string
    domain: string | null
    shouldAttachUserByDomain: boolean
}

type CreateOrganizaitonResponse = void

export async function createOrganization({
    name, domain, shouldAttachUserByDomain,
}: CreateOrganizaitonRequest): Promise<CreateOrganizaitonResponse> {
    await api.post('organization', {
        json: {
            name,
            domain,
            shouldAttachUserByDomain
        }
    })
}
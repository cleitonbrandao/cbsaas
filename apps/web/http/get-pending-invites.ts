import { Role } from "@cbsaas/auth";
import { api } from "./api-client";


interface GetPendingInvitesResponse {
    invites: {
        organization: {
            name: string
        };
        id: string
        createdAt: string
        role: Role
        email: string
        author: {
            name: string | null
            id: string
            avatarUrl: string | null
        };
    }[]
}

export async function GetPendingInvites() {
    const result = await api.get('pending-invites').json<GetPendingInvitesResponse>()

    return result
}
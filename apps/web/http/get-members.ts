import { Role } from "@cbsaas/auth";
import { api } from "./api-client";

interface GetMembersResponse {
    members: {
        name: string | null
        id: string
        avatarUrl: string | null
        role: Role
        userId: string
        email: string
    }[]
}

export async function GetMembers(org: string) {
    const result = await api.get(`organization/${org}/members`,{
        next: {
            tags: [`${org}/members`],
        },
    }).json<GetMembersResponse>()
    return result
}
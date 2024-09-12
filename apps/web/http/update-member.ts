import { Role } from "@cbsaas/auth"
import { api } from "./api-client"

interface UpdateMemberRequest {
    org: string
    memberId: string
    role: Role
}

export async function UpdateMember({org, memberId, role}: UpdateMemberRequest) {
    await api.put(`organizations/${org}/members/${memberId}`, {
        json: {
            role
        }
    })
}
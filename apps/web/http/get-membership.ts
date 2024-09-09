import { api } from "./api-client";
import { Role } from "@cbsaas/auth";

interface GetMembership {
    membership: {
        id: string
        role: Role
        userId: string
        organizationId: string
    }
}

export async function getMembership(org: string) {
    const result = await api.get(`organization/${org}/membership`).json<GetMembership>()

    return result
}
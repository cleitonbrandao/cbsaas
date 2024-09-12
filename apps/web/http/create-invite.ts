import { api } from "./api-client";
import { Role } from '../../../packages/auth/src/roles';

interface CreateInviteRequest {
    org: string
    email: string
    role: Role
}



export async function createInvite({org, email, role}: CreateInviteRequest) {
    await api.post(`organizations/${org}/invites`, {
        json: {
            email, role
        }
    })
}
import { api } from "./api-client";



export async function AcceptInvite(inviteId: string) {
    await api.post(`invites/${inviteId}/accept`)
}
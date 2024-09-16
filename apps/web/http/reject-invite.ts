import { api } from './api-client';

export async function RejectInvite(inviteId: string) {
    await api.post(`invites/${inviteId}/reject`)
}
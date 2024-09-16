'use server'

import { AcceptInvite } from "http/accept-invite";
import { RejectInvite } from "http/reject-invite";
import { revalidateTag } from "next/cache";

export async function AccpetInviteAction(inviteId: string) {
    await AcceptInvite(inviteId)

    revalidateTag('organizations')
}

export async function RejectInviteAction(inviteId: string) {
    await RejectInvite(inviteId)

}
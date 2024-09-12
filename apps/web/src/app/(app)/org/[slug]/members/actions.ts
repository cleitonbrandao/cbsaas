'use server'

import { getCurrentOrg } from "@/auth/auth";
import { removeMemeber } from "http/remove-member";

export async function removeMemberAction(memberId: string) {
    const currentOrg = getCurrentOrg()

    await removeMemeber({org: currentOrg!, memberId})
    
    revalidateTag(`${currentOrg}/members`)
}
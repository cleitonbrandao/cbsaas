'use server'

import { getCurrentOrg } from "@/auth/auth";
import { Role } from "@cbsaas/auth";
import { removeMemeber } from "http/remove-member";
import { UpdateMember } from "http/update-member";
import { revalidateTag } from "next/cache";

export async function removeMemberAction(memberId: string) {
    const currentOrg = getCurrentOrg()

    await removeMemeber({org: currentOrg!, memberId})
    
    revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
    const currentOrg = getCurrentOrg()

    await UpdateMember({
        org: currentOrg!,
        memberId,
        role
    })

    revalidateTag(`${currentOrg}/members`)
}
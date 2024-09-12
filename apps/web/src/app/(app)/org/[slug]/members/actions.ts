'use server'

import { getCurrentOrg } from "@/auth/auth";
import { Role, roleSchema } from "@cbsaas/auth";
import { createInvite } from "http/create-invite";
import { removeMemeber } from "http/remove-member";
import { RevokeInvite } from "http/revoke-invite";
import { UpdateMember } from "http/update-member";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";
import { z } from 'zod'

const inviteSchema = z.object({
    email: z.string().email({message: 'Invalid e-mail address.'}),
    role: roleSchema
})

export async function CreateInviteAction(data: FormData) {
    const currentOrg = getCurrentOrg()
    const result = inviteSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors}
    }

    const {email, role} = result.data

    try{
        await createInvite({
            org: currentOrg!,
            email,
            role
        })

        revalidateTag(`${currentOrg}/invites`)
    }catch(error) {
        if(error instanceof HTTPError){
            const {message} = await error.response.json()

            return {success: false, message, errors: null}
        }
        console.error(error)

        return {success: false, message: 'Unexpected error, try again in few minutes.', errors: null}
    }

    return {
        success: true, 
        message: 'Successfuly created the invite.', 
        errors: null
    }

}

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

export async function revokeInviteAction(inviteId: string) {
    const currentOrg = getCurrentOrg()

    await RevokeInvite({org: currentOrg!, inviteId})

    revalidateTag(`${currentOrg}/invites`)
}
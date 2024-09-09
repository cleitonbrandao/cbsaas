import { GetProfile } from "http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMembership } from "http/get-membership";
import { defineAbilityFor } from "@cbsaas/auth";

export function isAuthenticated() {
    return !!cookies().get('token')?.value
}

export function getCurrentOrg() {
    return cookies().get('org')?.value ?? null
}

export async function ability() {
    const membership = await getCurrentMembership()

    if(!membership) {
        return null
    }

    const ability = defineAbilityFor({
        id: membership.userId,
        role: membership.role   
    })

    return ability
}

export async function getCurrentMembership() {
    const org = getCurrentOrg()

    if(!org) {
        return null
    }

    const { membership } = await getMembership(org)

    return membership
}

export async function auth() {
    const token = cookies().get('token')?.value
    if(!token) {
        redirect('/auth/sign-in')
    }

    try{
        const { user } = await GetProfile()
        console.log(user)
        return user
    } catch{}

    redirect('/api/auth/sign-out')
}
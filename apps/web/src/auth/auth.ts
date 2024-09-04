import { GetProfile } from "http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function isAuthenticated() {
    return !!cookies().get('token')?.value
}

export async function auth() {
    const token = cookies().get('token')?.value

    if(!token) {
        console.log('dentro do !token');
        redirect('/auth/sign-in')
    }

    try{
        const { user } = await GetProfile()

        return user
    } catch(err) {
    }

    redirect('/api/auth/sign-out')
}
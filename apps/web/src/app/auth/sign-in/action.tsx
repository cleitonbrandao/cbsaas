'use server'

import  {z}  from 'zod';
import { cookies } from 'next/headers';

import { SignInWithPassword } from "http/sign-in-with-password";
import { HTTPError } from 'ky';
import { AcceptInvite } from 'http/accept-invite';

const signInSchema = z.object({
    email: z.string().email({ message: 'Please, provide a valid e-mail address.'}),
    password: z.string().min(1, { message: 'Please, provider your password.'}),
})

export async function signInWithEmailAndPassword(data: FormData) {

    const result = signInSchema.safeParse(Object.fromEntries(data));

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return { success: false, message: null, errors}
    }

    const { email, password } = result.data


    // await new Promise(resolve => setTimeout(resolve, 2000));

    try{
        const { token } = await SignInWithPassword({
            email, 
            password
        })
        
        cookies().set('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7.
        })

        const inviteId = cookies().get('inviteId')?.value

        if(inviteId) {
            try{
                await AcceptInvite(inviteId)
                cookies().delete('inviteId')
            } catch {}
        }

    }catch(err) {
        if(err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null}
        }

        console.error(err)
        return { success: false, message: 'Unexpected error, try again in few minutes.', errors: null}
    }

    return { success: true, message: null, errors: null};
}
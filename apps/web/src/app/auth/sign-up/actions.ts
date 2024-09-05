'use server'

import { z } from 'zod'
import { SignUp } from 'http/sign-up'
import { HTTPError } from 'ky'

const signUpSchema = z.object({
    name: z.string().refine(value => value.split(' ').length > 1, {
        message: 'Please, enter your full name.'
    }),
    email: z.string().email({message: 'Please, provider a valid e-mail address.'}),
    password: z.string().min(6, {message: 'Password shoud have at least 6 caracters.'}),
    password_confimation: z.string(),
}).refine(data => data.password === data.password_confimation, {
    message: 'Password confirmation does not match.',
    path: ['password_confimation']
})

export async function signUpActions(data: FormData) {
    const result = signUpSchema.safeParse(Object.fromEntries(data));
    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { name, email, password } = result.data

    try {
        await SignUp({
            name, email, password
        })
    } catch(err) {
        if(err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null }
        }

        console.error(err)

        return { 
            success: false, 
            message: 'Unexpect error, try again in few minutes.',
            errors: null
        }
    }

    return { success: true, message: null, errors: null }

}
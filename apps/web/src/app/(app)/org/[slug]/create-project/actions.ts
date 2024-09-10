'use server'

import { HTTPError } from 'ky'
import {string, z} from 'zod'
import { CreateProject } from 'http/create-project'
import { getCurrentOrg } from '@/auth/auth'

const projectSchema = z.object({
    name: string().min(4, {message: 'Pleasw, include at least 4 caracters.'}),
    description: string()
})

export async function createProjectAction(data: FormData) {
    const result = projectSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message: null, errors}
    }

    const {name, description} = result.data

    try{
        await CreateProject({
            org: getCurrentOrg()!,
            name,
            description
        })
    }catch(error) {
        if(error instanceof HTTPError) {
            const {message} = await error.response.json()

            return {success: false, message: 'Unexpected error, try again in a few minutes.', errors: null}
        }

        console.error(error)
    }

    return {
        success: true, 
        message: 'Successfuly create the project.', 
        errors: null
    }
}
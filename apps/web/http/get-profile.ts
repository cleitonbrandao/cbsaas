import { api } from './api-client'

interface GetProfileReponse {
    user: {
        id:string
        name: string | null
        email: string
        avatarUrl: string | null
    }
}

export async function GetProfile() {
    const result = await api.get('profile').json<GetProfileReponse>()

    return result
}
import { api } from './api-client'

interface GetProfileReponse {
    user: {
        name: string | null
        id: string
        avatarUrl: string | null
        email: string
    }
}

export async function GetProfile() {
    const result = await api.get('profile').json<GetProfileReponse>()

    return result
}
import { api } from 'http/api-client';

interface SearchProductsRequest {
    org: string
    query: string
}

interface SearchProductsResponse {
    products: {
        id: string
        name: string
    }[]
}

export async function SearchQueryProducts({org, query}: SearchProductsRequest) {
    const result = await api.get(`organizations/${org}/search/${query}`).json<SearchProductsResponse>()

    return result
}
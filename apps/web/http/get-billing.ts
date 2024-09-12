import { api } from "./api-client";

interface GetBillingResponse {
    billing: {
        seats: {
            amount: number
            unit: number
            price: number
        };
        projects: {
            amount: number
            unit: number
            price: number
        };
        total: number
    }
}

export async function GetBilling(org: string) {
    const result = await api.get(`organizaitons/${org}/billing`).json<GetBillingResponse>()
    
    return result
}
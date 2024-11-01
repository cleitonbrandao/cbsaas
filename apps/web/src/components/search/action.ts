'use server'

import { getCurrentOrg } from "@/auth/auth"
import { SearchQueryProducts } from "http/searchs/search-products"


export async function searchProdutAction(query: string) {
    const currentOrg = getCurrentOrg()
    const items = await SearchQueryProducts({org: currentOrg!, query})

    if(!items) {
        return null
    }

    return items || { products: [], services: [], packages: []}
}
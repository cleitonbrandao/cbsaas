'use server'

import { getCurrentOrg } from "@/auth/auth"
import { SearchQueryProducts } from "http/searchs/search-products"


export async function searchProdutAction(query: string) {
    const currentOrg = getCurrentOrg()
    const products = await SearchQueryProducts({org: currentOrg!, query})

    if(!products) {
        return 'Product Not found.'
    }

    return products
}
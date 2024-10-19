import { ability, getCurrentOrg } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductList } from "./product-list"
import { getProducts } from "http/get-products"

export default async function Projects() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()
    const { products } = await getProducts(currentOrg!)
    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>

                {permissions?.can('create', 'Project') && (
                    <Button size="sm" asChild>
                        <Link href={`/org/${currentOrg}/products/create-product`}>
                            <Plus className="size-4 mr-2"/>
                            Create product
                        </Link>
                    </Button>
                )}
            </div>

            {permissions?.can('get', 'Project') ? (
                <ProductList currentOrg={currentOrg} products={products}/>
            ) : (
                <p className="text-sm text-muted-foreground">You are not allowed to see organization projects</p>
            )}
        </div>
    )
}
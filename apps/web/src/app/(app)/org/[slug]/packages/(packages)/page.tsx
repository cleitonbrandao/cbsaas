import { ability, getCurrentOrg } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getProducts } from "http/get-products"
import { PackageList } from "./package-list"
import { GetPackages } from "http/packages/get-packages"

export default async function Packages() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()
    // const { products } = await getProducts(currentOrg!)
    const { packages } = await GetPackages(currentOrg!)
    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Package</h1>

                {permissions?.can('create', 'Project') && (
                    <Button size="sm" asChild>
                        <Link href={`/org/${currentOrg}/packages/create-package`}>
                            <Plus className="size-4 mr-2"/>
                            Create package
                        </Link>
                    </Button>
                )}
            </div>

            {permissions?.can('get', 'Project') ? (
                <PackageList currentOrg={currentOrg} packages={packages}/>
            ) : (
                <p className="text-sm text-muted-foreground">You are not allowed to see organization projects</p>
            )}
        </div>
    )
}
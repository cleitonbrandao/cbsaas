import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";
import { PackageForm } from "./package-form";
import SearchProducts from "@/components/search/search-product";

export default async function Createackage() {
    const permissions = await ability()

    if(permissions?.cannot('create', 'Project')) {
        redirect('/')
    }
    return (
        <div className="space-y-4">
            <h1  className="text-2xl font-bold">Create Package</h1>
            <SearchProducts />
            <PackageForm />
        </div>
    )
}
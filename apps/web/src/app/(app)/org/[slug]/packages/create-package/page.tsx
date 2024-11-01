import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";
import { PackageForm } from "./package-form";
import SearchProductsPage from "@/components/search/search-product";
import { SelectedItemsProvider } from "@/contexts/SelectedItemsContext";



export default async function Createackage() {
    const permissions = await ability()

    if(permissions?.cannot('create', 'Project')) {
        redirect('/')
    }
    
    return (
        <SelectedItemsProvider>
            <div className="space-y-4">
                <div className="flex flex-row justify-between">
                    <h1  className="text-2xl font-bold">Create Package</h1>
                    <SearchProductsPage />
                </div>
                <PackageForm />
            </div>
        </SelectedItemsProvider>
    )
}
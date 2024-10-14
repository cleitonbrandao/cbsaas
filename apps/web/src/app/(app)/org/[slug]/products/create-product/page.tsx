import { ProductForm } from "./product-form";
import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function CreateProduct() {
    const permissions = await ability()

    if(permissions?.cannot('create', 'Project')) {
        redirect('/')
    }
    return (
        <div className="space-y-4">
            <h1  className="text-2xl font-bold">Create Product</h1>
            <ProductForm />
        </div>
    )
}
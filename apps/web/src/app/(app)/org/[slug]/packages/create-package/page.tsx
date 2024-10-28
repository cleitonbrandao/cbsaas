import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";
import { PackageForm } from "./package-form";

export default async function Createackage() {
    const permissions = await ability()

    if(permissions?.cannot('create', 'Project')) {
        redirect('/')
    }
    return (
        <div className="space-y-4">
            <h1  className="text-2xl font-bold">Create Package</h1>
            <PackageForm />
        </div>
    )
}
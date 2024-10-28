import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ServiceForm } from "./service-form";

export default async function CreateService() {
    const permissions = await ability()

    if(permissions?.cannot('create', 'Project')) {
        redirect('/')
    }
    return (
        <div className="space-y-4">
            <h1  className="text-2xl font-bold">Create Service</h1>
            <ServiceForm />
        </div>
    )
}
import { ability } from "@/auth/auth";
import { GetService } from "http/service/get-service";
import { redirect } from "next/navigation";
import { ServiceForm } from "../../create-service/service-form";

interface UpdatingServicePageProps {
    params: { id: string; slug: string };
}

export default async function UpdatingServicePage({ params }: UpdatingServicePageProps) {
    const { id: serviceId, slug } = params;
    const permissions = await ability();

    if (permissions?.cannot('create', 'Project')) {
        redirect('/');
    }

    const {service} = await GetService({org: slug, serviceId});
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Edit Service</h1>
            <ServiceForm isUpdating initialData={service} />
        </div>
    );
}

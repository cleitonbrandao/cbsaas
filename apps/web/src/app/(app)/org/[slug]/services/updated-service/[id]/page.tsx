import { ProductForm } from "@/app/(app)/org/[slug]/products/create-product/product-form";
import { ability } from "@/auth/auth";
import { GetProduct } from "http/get-product";
import { GetService } from "http/service/get-service";
import { redirect } from "next/navigation";

interface UpdatingProductPageProps {
    params: { id: string; slug: string };
}

export default async function UpdatingProductPage({ params }: UpdatingProductPageProps) {
    const { id: serviceId, slug } = params;
    const permissions = await ability();

    if (permissions?.cannot('create', 'Project')) {
        redirect('/');
    }

    const {service} = await GetService({org: slug, serviceId});
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Edit Service</h1>
            {/* <ServiceForm isUpdating initialData={service} /> */}
        </div>
    );
}

import { ProductForm } from "@/app/(app)/org/[slug]/products/create-product/product-form";
import { ability } from "@/auth/auth";
import { GetProduct } from "http/get-product";
import { redirect } from "next/navigation";

interface UpdatingProductPageProps {
    params: { id: string; slug: string };
}

export default async function UpdatingProductPage({ params }: UpdatingProductPageProps) {
    const { id: productId, slug } = params;
    const permissions = await ability();

    if (permissions?.cannot('create', 'Project')) {
        redirect('/');
    }

    const {product} = await GetProduct({org: slug, productId});
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <ProductForm isUpdating initialData={product} />
        </div>
    );
}

import { ability, getCurrentOrg } from "@/auth/auth";
import { permissions } from '../../../../../../../../../packages/auth/src/permissions';
import { GetServices } from "http/service/get-services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ServiceList } from "./service-list";

export default async function Services() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()
    const {services} = await GetServices(currentOrg!)

    return(
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Services</h1>

                {permissions?.can('create', 'Project') && (
                    <Button size="sm" asChild>
                        <Link href={`/org/${currentOrg}/products/create-product`}>
                            <Plus className="size-4 mr-2"/>
                            Create service
                        </Link>
                    </Button>
                )}
            </div>

            {permissions?.can('get', 'Project') ? (
                <ServiceList currentOrg={currentOrg} services={services}/>
            ) : (
                <p className="text-sm text-muted-foreground">You are not allowed to see organization services</p>
            )}
        </div>
    )
}
import { getCurrentOrg } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { ShuttdownOrganization } from "http/shutdown-organization";
import { XCircle } from "lucide-react";
import { redirect } from "next/navigation";

export function ShuttdownOrganizationButton() {
    async function shuttdownOrganizationAction() {
        'use server'

        const currentOrg = getCurrentOrg()

        await ShuttdownOrganization({org: currentOrg!})

        redirect('/')
    }
    return (
        <form action={shuttdownOrganizationAction}>
            <Button type="submit" variant="destructive" className="w-56">
                <XCircle className="size-4 mr-2" />
                Shuttdown organization
            </Button>
        </form>
    )
}
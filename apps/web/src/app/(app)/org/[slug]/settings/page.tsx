import { OrganizaitonForm } from "@/app/(app)/create-organization/organization-form"
import { ability } from "@/auth/auth"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"

export default async function Settings() {
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>

            <div className="space-y-4">
                {canUpdateOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle></CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrganizaitonForm />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
import { OrganizaitonForm } from "@/app/(app)/create-organization/organization-form"
import { ability, getCurrentOrg } from "@/auth/auth"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { ShuttdownOrganizationButton } from "./shuttdown-organization-button"
import { GetOrganization } from "http/get-organization"

export default async function Settings() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')
    const canShuttdownOrganization = permissions?.can('delete', 'Organization')
    const { organization } = await GetOrganization(currentOrg!)
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>

            <div className="space-y-4">
                {canUpdateOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization settings</CardTitle>
                            <CardDescription>Update your organization details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrganizaitonForm isUpdating initialData={{
                                name: organization.name,
                                domain: organization.domain,
                                shouldAttachUserByDomain: organization.shouldAttachUserByDomain
                            }}/>
                        </CardContent>
                    </Card>
                )}

                {canGetBilling && <div>billing</div>}

                {canUpdateOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Shuttdown organization.</CardTitle>
                            <CardDescription>
                                This will delete all organization data incluinding all projects. You cannot undo this action.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ShuttdownOrganizationButton />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
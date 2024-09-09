import { OrganizaitonForm } from "./organization-form";


export default async function CreateOrganization() {
    return(
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Create organization</h1>
            <OrganizaitonForm />
        </div>
    )
}
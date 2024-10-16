import { Button } from "./ui/button";
import { ability, getCurrentOrg } from "@/auth/auth";
import { NavLink } from "./nav-link";

export async function Tabs() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')
    const canGetMembers = permissions?.can('get', 'User')
    const canGetProjects = permissions?.can('get', 'Project')

    return (
        <div className="border-b py-4">
            <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
            {canGetProjects && (
                <Button asChild variant="ghost" size="sm" 
                className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                    <NavLink href={`/org/${currentOrg}`}>
                        Projects
                    </NavLink>
                </Button>
            )}
            {canGetMembers && (
                <Button asChild variant="ghost" size="sm" 
                className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                    <NavLink href={`/org/${currentOrg}/members`}>
                        Members
                    </NavLink>
                </Button>            
            )}

            {(canUpdateOrganization || canGetBilling) && (
                <Button asChild variant="ghost" size="sm" 
                    className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                    <NavLink href={`/org/${currentOrg}/settings`}>
                        Setting & Billing
                    </NavLink>
                </Button>
            )}
            
            {/* {(canUpdateOrganization || canGetBilling) && ( */}
                <Button asChild variant="ghost" size="sm" 
                    className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                    <NavLink href={`/org/${currentOrg}/products`}>
                        Products
                    </NavLink>
                </Button>
            {/* )} */}
            </nav>
        </div>
    )
}
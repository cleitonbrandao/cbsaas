import { Button } from "./ui/button";
import { getCurrentOrg } from "@/auth/auth";
import { NavLink } from "./nav-link";

export async function Tabs() {
    const currentOrg = getCurrentOrg()
    return (
        <div className="border-b py-4">
            <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
            <Button asChild variant="ghost" size="sm" 
            className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                <NavLink href={`/org/${currentOrg}`}>
                    Projects
                </NavLink>
            </Button>
            <Button asChild variant="ghost" size="sm" 
            className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                <NavLink href={`/org/${currentOrg}/members`}>
                    Members
                </NavLink>
            </Button>            
            <Button asChild variant="ghost" size="sm" 
            className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-input">
                <NavLink href={`/org/${currentOrg}/settings`}>
                    Setting & Billing
                </NavLink>
            </Button>
            </nav>
        </div>
    )
}
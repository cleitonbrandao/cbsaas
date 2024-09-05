import { DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
 } from "./ui/dropdown-menu";
import { ChevronDown, CirclePlusIcon, Link } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetOrganizations } from "http/get-organizations";
export async function OrganizationSwitcher() {
    const { organizations } = await GetOrganizations()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
            className="flex w-[168px] items-center gap-2 
            rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span className="text-muted-foreground">Select organization</span>
                <ChevronDown className="ml-auto size-4 text-muted-foreground"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-16} className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                    {organizations.map(organization => {
                        return (
                            <DropdownMenuItem key={organization.id}>
                                <a href={`/org/${organization.slug}`}>
                                    <Avatar className="mr-2 size-4">
                                        {organization.avatarUrl && <AvatarImage src={organization.avatarUrl}/>}
                                        <AvatarFallback />
                                    </Avatar>
                                    <span className="line-clamp-1">{organization.name}</span>
                                </a>
                        </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href="">
                        <CirclePlusIcon className="mr-2 size-4"/>
                        Create new
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
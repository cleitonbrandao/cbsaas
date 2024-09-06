import { DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
 } from "./ui/dropdown-menu";
import { ChevronDown, CirclePlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetOrganizations } from "http/get-organizations";
import Link from "next/link";
import { cookies } from "next/headers";

export async function OrganizationSwitcher() {
    const currentOrg = cookies().get('org')?.value
    const { organizations } = await GetOrganizations()

    const currentOrganization = organizations.find((org) => org.slug === currentOrg)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
            className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {currentOrganization ? (
                    <>
                        <Avatar className="mr-2 size-4">
                            {currentOrganization.avatarUrl && <AvatarImage src={currentOrganization.avatarUrl}/>}
                            <AvatarFallback />
                        </Avatar>
                        <span className="truncate text-left">{currentOrganization.name}</span>
                    </>
                ) : (
                    <span className="text-muted-foreground">Select organization</span>
                )}
                <ChevronDown className="ml-auto size-4 text-muted-foreground"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-16} className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                    {organizations.map(organization => {
                        return (
                            <DropdownMenuItem key={organization.id} asChild>
                                <Link href={`/org/${organization.slug}`}>
                                    <Avatar className="mr-2 size-4">
                                        {organization.avatarUrl && <AvatarImage src={organization.avatarUrl}/>}
                                        <AvatarFallback />
                                    </Avatar>
                                    <span className="line-clamp-1">{organization.name}</span>
                                </Link>
                        </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="">
                        <CirclePlusIcon className="mr-2 size-4"/>
                        Create new
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
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

export function OrganizationSwitcher() {
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
                    <DropdownMenuItem>
                        <Avatar className="mr-2 size-4">
                            <AvatarImage src="https://github.com/rocketseat.png"/>
                            <AvatarFallback />
                        </Avatar>
                        <span className="line-clamp-1">Rocketseat</span>
                    </DropdownMenuItem>
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
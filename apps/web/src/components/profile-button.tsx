import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ChevronDown, LogOut } from "lucide-react";
import { auth } from "@/auth/auth";

function getInitials(name: string): string {
    const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

    return initials
}

export async function ProfileButton() {
    const user  = await auth()

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outiline-none">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-zinc-400">{user.email}</span>
                </div>
            
                <Avatar>
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl}/>}
                    {user.name && (<AvatarFallback>{getInitials(user.name)}</AvatarFallback>)}
                </Avatar>
                <ChevronDown className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <a href="/api/auth/sign-out">
                        <LogOut className="mr-2 size-4"/>
                        Sign Out
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
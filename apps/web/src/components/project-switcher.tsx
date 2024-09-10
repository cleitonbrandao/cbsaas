'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { ChevronDown, CirclePlusIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getProjects } from "http/get-projects"
import { use } from "react"
import { useQuery } from "@tanstack/react-query"

export function ProjectSwitcher() {
    const { slug: orgSlug} = useParams<{
        slug: string
    }>()

    const {data, isLoading} = useQuery({
        queryKey: [orgSlug, 'projects'],
        queryFn: () => getProjects(orgSlug),
        enabled: !!orgSlug,
    })

    return (
        <DropdownMenu>
        <DropdownMenuTrigger 
        className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {/* {currentOrganization ? (
                <>
                    <Avatar className="mr-2 size-4">
                        {currentOrganization.avatarUrl && <AvatarImage src={currentOrganization.avatarUrl}/>}
                        <AvatarFallback />
                    </Avatar>
                    <span className="truncate text-left">{currentOrganization.name}</span>
                </>
            ) : ( */}
                <span className="text-muted-foreground">Select project</span>
            {/* )} */}
            <ChevronDown className="ml-auto size-4 text-muted-foreground"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-16} className="w-[200px]">
            <DropdownMenuGroup>
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                {/* {organizations.map(organization => {
                    return ( */}
                        <DropdownMenuItem /*key={organization.id}*/ asChild>
                            <Link href="">
                                <Avatar className="mr-2 size-4">
                                    {/* {organization.avatarUrl && <AvatarImage src={organization.avatarUrl}/>} */}
                                    <AvatarFallback />
                                </Avatar>
                                <span className="line-clamp-1">Project test</span>
                            </Link>
                    </DropdownMenuItem>
                    {/* )
                })} */}
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
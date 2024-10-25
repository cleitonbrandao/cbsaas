'use client'
import { useQuery } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { getProducts } from "http/get-products";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChevronsUpDown, CirclePlusIcon, Loader2 } from "lucide-react"
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import { getCurrentOrg } from "@/auth/auth";
import Link from "next/link";

export function ProductSwhtcher({ currentOrgSlug }: { currentOrgSlug?: string }) {
    // const currentOrg = getCurrentOrg()
    const { slug: orgSlugFromParams, project: projectSlug } = useParams();
    const router = useRouter();
    const orgSlug = currentOrgSlug || orgSlugFromParams;

    const currentSwitch = "";

    const handleNavigate = (path: string) => {
        router.push(path); // Navegação programática
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
            className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {isLoading ? (
                    <>
                        <Skeleton className="size-4 shrink-0 rounded-full"/>
                        <Skeleton className="h-4 w-full"/>
                    </>
                ) : (
                    <>
                    {currentSwitch ? (
                        <>
                            <span className="truncate text-left">Products</span>
                            <span className="truncate text-left">Services</span>
                            <span className="truncate text-left">Packages</span>
                        </>
                    ) : (
                        <span className="text-muted-foreground">Select</span>
                    )}
                    </>
                )}
                {isLoading ? (
                    <Loader2 className="ml-auto size-4 animate-spin text-muted-foreground shrink-0"/>
                ) : (
                    <ChevronsUpDown className="ml-auto size-4 text-muted-foreground shrink-0"/>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-16} className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Items</DropdownMenuLabel>
                    {/* {data && data.projects.map(project => {
                        return ( */}
                            <DropdownMenuItem asChild onClick={() => handleNavigate(`/org/${orgSlug}/products`)}>
                                <span className="line-clamp-1">Products</span>
                            </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild onClick={() => handleNavigate(`/org/${orgSlug}/services`)}>
                        <span className="line-clamp-1">Services</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild onClick={() => handleNavigate(`/org/${orgSlug}/packages`)}>
                        <span className="line-clamp-1">Packages</span>
                    </DropdownMenuItem>
                        {/* )
                    })} */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/org/${orgSlug}/create-project`}>
                        <CirclePlusIcon className="mr-2 size-4"/>
                        Create new
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
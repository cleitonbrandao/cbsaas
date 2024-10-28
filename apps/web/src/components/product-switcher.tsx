'use client'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { ChevronsUpDown, CirclePlusIcon, Loader2, Plus } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ProductSwhtcher({ currentOrgSlug }: { currentOrgSlug?: string }) {
    // const currentOrg = getCurrentOrg()
    const { slug: orgSlugFromParams, project: projectSlug } = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const orgSlug = currentOrgSlug || orgSlugFromParams;
    const [isLoading, setIsLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState("")
    const [createDestine, setCreateDestine] = useState("")
    useEffect(() => {
        // urlNow = 
        // Define o item selecionado com base na URL atual
        if (pathname.includes("/products")) {setSelectedItem("Products"); setCreateDestine("product");}
        else if (pathname.includes("/services")) {setSelectedItem("Services"); setCreateDestine("service");}
        else if (pathname.includes("/packages")) {setSelectedItem("Packages"); setCreateDestine("package");}
        else setSelectedItem("");
    }, [pathname]);

    const handleNavigate = async (path: string, item: string) => {
        setIsLoading(true);
        setSelectedItem(item);
        router.push(path); // Navegação programática
        setIsLoading(false);
    };
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
                        <span className="truncate text-left">{selectedItem || "Select product"}</span>
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
                    <div className="flex flex-row justify-between items-center">
                        <DropdownMenuItem className="focus:bg-gradient-to-r focus:from-accent focus:to-stone-950 focus:bg-inherit" asChild onClick={() => handleNavigate(`/org/${orgSlug}/products`, "Products")}>
                                <span className={`line-clamp-1 ${selectedItem === "Products" ? "font-semibold" : "text-muted-foreground"} w-full`}>Products</span>
                        </DropdownMenuItem>
                        <Button className="flex flex-row p-1" size="xs" variant="outline" asChild>
                            <Link href={`/org/${orgSlug}/products/create-product`} prefetch={false}>
                                <Plus className="size-4 mr-2"/>
                                new
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <DropdownMenuItem className="focus:bg-gradient-to-r focus:from-accent focus:to-stone-950 focus:bg-inherit" asChild onClick={() => handleNavigate(`/org/${orgSlug}/services`, "Services")}>
                                <span className={`line-clamp-1 ${selectedItem === "Services" ? "font-semibold" : "text-muted-foreground"} w-full`}>Services</span>
                        </DropdownMenuItem>
                        <Button className="flex flex-row p-1" size="xs" variant="outline" asChild>
                            <Link href={`/org/${orgSlug}/services/create-service`} prefetch={false}>
                                <Plus className="size-4 mr-2"/>
                                new
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <DropdownMenuItem className="focus:bg-gradient-to-r focus:from-accent focus:to-stone-950 focus:bg-inherit" asChild onClick={() => handleNavigate(`/org/${orgSlug}/packages`, "Packages")}>
                                <span className={`line-clamp-1 ${selectedItem === "Pakages" ? "font-semibold" : "text-muted-foreground"} w-full`}>Packages</span>
                        </DropdownMenuItem>
                        <Button className="flex flex-row p-1" size="xs" variant="outline" asChild>
                            <Link href={`/org/${orgSlug}/packages/create-package`} prefetch={false}>
                                <Plus className="size-4 mr-2"/>
                                new
                            </Link>
                        </Button>
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`${pathname}/create-${createDestine}`}>
                        <CirclePlusIcon className="mr-2 size-4"/>
                        Create new
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
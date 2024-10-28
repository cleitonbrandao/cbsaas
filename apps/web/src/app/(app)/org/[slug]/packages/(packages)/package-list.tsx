'use client'
import { getCurrentOrg } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Table, TableRow, TableBody, TableHead, TableHeader, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { FormEvent, useState } from "react";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";

dayjs.extend(relativeTime)

interface Packages {
    id: string
    name: string
    description: string | null
    price: string | null
    created_at: string
    products: {
        name: string;
        id: string;
        description: string | null
        price: string | null
        price_cost: string | null
        created_at: string
    }
    services: {
        name: string;
        id: string;
        description: string | null
        price: string | null
        price_cost: string | null
        created_at: string
    }
}[]

interface PackageListProps {
    currentOrg: string | null
    packages: Packages[]
}

export function PackageList({currentOrg, packages}: PackageListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

    const handleDeleteRequest = (packageId: string) => {
        setProductIdToDelete(packageId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (productIdToDelete) {
            // await removeProductAction(productIdToDelete);
            setIsModalOpen(false);
            setProductIdToDelete(null);
        }
    };

    return (
        <>
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="w-[500px]">Description</TableHead>
                    <TableHead>Price</TableHead>
                    {/* <TableHead>Price Cost</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {packages.map(registerPackage => {
                    return(
                        <TableRow key={registerPackage.id}>
                            <TableCell  className="font-medium">{registerPackage.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm line-clamp-1" >{registerPackage.description}</TableCell>
                            <TableCell >{(Number(registerPackage.price)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            {/* <TableCell >{(Number(registerPackage.price_cost)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell> */}
                            <TableCell className="flex flex-row gap-2">
                                <Button size="xs" variant="outline" asChild>
                                    <Link href={`/org/${currentOrg}/products/${registerPackage.id}`}>
                                        <ArrowRight className="size-4 mr-2"/>
                                        Details
                                    </Link>
                                </Button>
                                <Button size="xs" variant="outline" asChild>
                                    <Link href={`/org/${currentOrg}/products/updated-product/${registerPackage.id}`}>
                                        <Pencil className="size-3 mr-2"/>
                                        Edit
                                    </Link>
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => handleDeleteRequest(registerPackage.id)}>
                                    Delete <Trash2 className="size-3 ml-2"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
            
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    )
}
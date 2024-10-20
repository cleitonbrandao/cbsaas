'use client'
import { getCurrentOrg } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Table, TableRow, TableBody, TableHead, TableHeader, TableCell } from "@/components/ui/table";
import { removeProductAction } from "../create-product/actions";
import Link from "next/link";
import { FormEvent, useState } from "react";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";

dayjs.extend(relativeTime)



async function handleDelete(event: FormEvent<HTMLFormElement>, productId: string) {
    event.preventDefault()

    const confirmed = window.confirm('teste do confirme delete')

    if(confirmed) {
        await removeProductAction(productId)
    }
}

interface Product {
    id: string
    name: string
    description: string | undefined
    price: string | undefined
    price_cost: string | undefined
    created_at: string
}

interface ProductListProps {
    currentOrg: string | null
    products: Product[]
}

export function ProductList({currentOrg, products}: ProductListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

    const handleDeleteRequest = (productId: string) => {
        setProductIdToDelete(productId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (productIdToDelete) {
            await removeProductAction(productIdToDelete);
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
                    <TableHead>Price Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => {
                    return(
                        <TableRow key={product.id}>
                            <TableCell  className="font-medium">{product.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm line-clamp-1" >{product.description}</TableCell>
                            <TableCell >{(Number(product.price)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell >{(Number(product.price_cost)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell className="flex flex-row gap-2">
                                <Button size="xs" variant="outline" asChild>
                                    <Link href={`/org/${currentOrg}/products/${product.id}`}>
                                        <ArrowRight className="size-4 mr-2"/>
                                        Details
                                    </Link>
                                </Button>
                                <Button size="xs" variant="outline" asChild>
                                    <Link href={`/org/${currentOrg}/products/updated-product/${product.id}`}>
                                        <Pencil className="size-3 mr-2"/>
                                        Edit
                                    </Link>
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => handleDeleteRequest(product.id)}>
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
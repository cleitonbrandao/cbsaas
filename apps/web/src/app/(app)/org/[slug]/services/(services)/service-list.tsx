'use client'
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Service {
    id: string
    name: string
    description: string | null
    price: string
    price_cost: string
    created_at: string
}

interface ServiceListProps {
    currentOrg: string | null
    services: Service[]
}

export function ServiceList({currentOrg, services}: ServiceListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null)

    const handleDeleteRequest = (serviceId: string) => {
        setServiceIdToDelete(serviceId)
        setIsModalOpen(true);
    }
    const handleDelete = async () => {
        if(serviceIdToDelete) {
            // await removeServiceAction(serviceIdToDelete)
            setIsModalOpen(false)
            setServiceIdToDelete(null)
        }
    }
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
                {services.map(service => {
                    return(
                        <TableRow key={service.id}>
                            <TableCell  className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm line-clamp-1" >{service.description}</TableCell>
                            <TableCell >{(Number(service.price)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell >{(Number(service.price_cost)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell className="flex flex-row gap-2">
                                <Button size="xs" variant="outline" asChild>
                                    <Link href={`/org/${currentOrg}/services/${service.id}`}>
                                        <ArrowRight className="size-4 mr-2"/>
                                        Details
                                    </Link>
                                </Button>
                                <Button size="xs" variant="outline" asChild>
                                    <Link href="">
                                    {/* <Link href={`/org/${currentOrg}/services/updated-service/${service.id}`}> */}
                                        <Pencil className="size-3 mr-2"/>
                                        Edit
                                    </Link>
                                </Button>
                                <Button size="xs" variant="destructive" onClick={() => handleDeleteRequest(service.id)}>
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
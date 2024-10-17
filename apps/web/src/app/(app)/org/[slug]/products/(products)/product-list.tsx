import { getCurrentOrg } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "http/get-projects";
import { Pencil, Trash2 } from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Table, TableRow, TableBody, TableHead, TableHeader, TableCell } from "@/components/ui/table";
import { getProducts } from "http/get-products";
import { removeProductAction } from "../create-product/actions";

dayjs.extend(relativeTime)

export async function ProductList() {
    const currentOrg = getCurrentOrg()
    const { products } = await getProducts(currentOrg!)

    return (
        <div className="grid grid-cols gap-4 p-3">
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Price Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => {
                    return(
                        <TableRow key={product.id}>
                            <TableCell  className="font-medium">{product.name}</TableCell>
                            <TableCell className="truncate" >{product.description}</TableCell>
                            <TableCell >{(Number(product.price)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell >{(Number(product.price_cost)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell className="flex flex-row gap-2">
                                <div>
                                    <Button size="xs" variant="outline" className="ml-auto">
                                        Edit <Pencil className="size-3 ml-2"/>
                                    </Button>
                                </div>
                                <form action={removeProductAction.bind(null, product.id)}>
                                    <Button size="xs" variant="destructive" className="ml-auto">
                                        Delete <Trash2 className="size-3 ml-2"/>
                                    </Button>
                                </form>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </div>
    )
}
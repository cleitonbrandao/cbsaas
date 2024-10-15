import { getCurrentOrg } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "http/get-projects";
import { ArrowRight } from "lucide-react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Table, TableRow, TableBody, TableHead, TableHeader, TableCell } from "@/components/ui/table";
import { getProducts } from "http/get-products";

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
                            <TableCell >{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell >{product.price_cost.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </div>
    )
}
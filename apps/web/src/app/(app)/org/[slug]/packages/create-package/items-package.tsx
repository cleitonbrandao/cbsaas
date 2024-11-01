'use server'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GetProduct } from "http/get-product"
import { getCurrentOrg } from '../../../../../../auth/auth';

interface ItemPackageProps {
    id: string
    index: number
    type: string
}
export async function ItemPackageForm({id: productId, index, type}: ItemPackageProps) {
    const currentOrg = getCurrentOrg()
    const {product: item} = await GetProduct({org: currentOrg!, productId})

    return (
        <>
            <Card className="w-[350px]" key={`${item.name}-${index}`}>
                <input type="hidden" name="items[]" value={item.id} />
                <CardHeader>
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                    <CardDescription className="line-clamp-3">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="relative">
                    <div className="flex flex-row gap-3">
                        <Badge className="flex border-green-200 hover:bg-green-300 justify-center text-muted-foreground hover:text-green-900 text-xs" variant="outline">{item.price}</Badge>
                        <Badge className="min-w-[100px] max-h-[25px] border-red-200 hover:bg-red-300 justify-center text-muted-foreground hover:text-red-900 text-xs" variant="outline">{item.price_cost}</Badge>
                    </div>
                    <Badge className="absolute bottom-0 right-0 justify-center bg-accent text-muted-foreground text-xs m-2" variant="outline">{type}</Badge>
                </CardFooter>
            </Card>
        </>
    )
}
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from "react";

dayjs.extend(relativeTime)

interface ProductDetailPageProps {
    product: {
        id: string
        name: string
        description?: string | null
        price: string
        price_cost: string
        created_at: string 
    }
}

export default function ProductDetailPage({product} : any) {
    return (
        <div className="px-2">
            <div className="flex flex-col">
                <div className="flex flex-col place-content-around h-[200px]">
                    <div className="text-xl font-semibold truncate">{product.name}</div>
                    <div className="text-sm pl-4 text-muted-foreground line-clamp-3 leading-relaxed">{product.description ?? "No description available"}</div>
                </div>
                <div className="flex flex-wrap justify-end items-end p-2 gap-4 mt-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge className="border-green-200" variant="outline">{formatCurrency(`${product.price}`)}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                Price
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge className="border-red-200" variant="outline">{formatCurrency(`${product.price_cost}`)}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                Price cost.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="text-center w-[230px] py-2">
                    <Badge className="text-sm" variant="secondary">Created at: <span className="text-muted-foreground ml-3">{dayjs(product.created_at).fromNow()}</span></Badge>
                </div>
            </div>
        </div>
    )
}
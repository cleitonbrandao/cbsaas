'use client'
 
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { useState } from 'react'
import { searchProdutAction } from './action'
import { Badge } from '../ui/badge'
import { useSelectedItems } from "@/contexts/SelectedItemsContext";

interface SearchResultItems {
    id: string
    name: string
    description: string | null
    price: string
    price_cost: string | null
    created_at: string
    type: "product" | "service" | "package"
}

interface SearchProductsResponse {
    products: SearchResultItems[]
    services: SearchResultItems[]
    packages: SearchResultItems[]
}

export default function SearchProductsPage() {
  const { addItem } = useSelectedItems();
  const [activeSearch, setActiveSearch] = useState<SearchProductsResponse | null>(null)
  const [query, setQuery] = useState<string | undefined>()
 
  const handelSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)

    if(value.length < 3) {
        setActiveSearch(null)
        return
    }

    const result = await searchProdutAction(value) as SearchProductsResponse;

    if (result) {
        const updatedResult: SearchProductsResponse = {
            products: result.products.map(item => ({ ...item, type: "product" })),
            services: result.services.map(item => ({ ...item, type: "service" })),
            packages: result.packages.map(item => ({ ...item, type: "package" })),
        };
        setActiveSearch(updatedResult);
    } else {
        setActiveSearch(null);
    }
  }

  return (
        <form className='w-[300px] relative'>
            <div className='relative'>
                <input type="search" onChange={(event) => handelSearch(event)} placeholder='Add products' className='w-full h-5 p-4 rounded-full bg-accent' />
            </div>
            {activeSearch && (
        <div className='flex flex-col bg-zinc-50 dark:bg-zinc-900 w-full rounded-sm absolute top-10 '>
            {activeSearch.products.length > 0 && (
                <>
                    {activeSearch.products.map((product) => (
                        <div key={product.id} className="flex flex-row justify-between">
                            <span className="relative w-full rounded-sm p-2 text-sm hover:bg-accent">{product.name}
                                <Badge className="text-muted-foreground bg-accent text-[9px] ml-1 h-[16px]" variant="outline">{product.type}</Badge>
                                <Button onClick={(event) => {event.preventDefault(); addItem(product); }}
                                    className="absolute slide-in-from-bottom-1/2 mr-1 right-0 h-[16px] text-sm text-muted-foreground" variant="outline" size="sm">add</Button>
                            </span>
                        </div>
                    ))}
                </>
            )}

            {activeSearch.services.length > 0 && (
                <>
                    {activeSearch.services.map((service) => (
                        <div key={service.id} className="flex flex-row justify-between">
                            <span className="relative w-full rounded-sm p-2 text-sm hover:bg-accent">
                                {service.name}
                                <Badge className="text-muted-foreground bg-accent text-[9px] ml-1 h-[16px]" variant="outline">{service.type}</Badge>
                                <Button onClick={(event) => {event.preventDefault(); addItem(service); }}
                                    className="absolute slide-in-from-bottom-1/2 mr-1 right-0 h-[16px] text-sm text-muted-foreground" variant="outline" size="sm">add</Button>
                            </span>
                        </div>
                    ))}
                </>
            )}

            {activeSearch.packages.length > 0 && (
                <>
                    {activeSearch.packages.map((packageItem) => (
                        <div key={packageItem.id} className="flex flex-row justify-between">
                            <span key={packageItem.id} className="relative w-full rounded-sm p-2 text-sm hover:bg-accent">
                                {packageItem.name}
                                <Badge className="text-muted-foreground text-[9px] ml-1 h-[16px]" variant="outline">{packageItem.type}</Badge>
                                <Button onClick={(event) => {event.preventDefault(); addItem(packageItem); }}
                                    className="absolute slide-in-from-bottom-1/2 mr-1 right-0 h-[16px] text-sm text-muted-foreground" variant="outline" size="sm">add</Button>
                            </span>
                        </div>
                    ))}
                </>
            )}
            </div>
        )}
        </form>
    )
}
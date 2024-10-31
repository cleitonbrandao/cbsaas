'use client'
 
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { useState } from 'react'
import { searchProdutAction } from './action'
import { Badge } from '../ui/badge'
 
interface SearchResultItems {
    id: string
    name: string
}

interface SearchProductsResponse {
    products: SearchResultItems[]
    services: SearchResultItems[]
    packages: SearchResultItems[]
}

export default function SearchProductsPage() {
  const [activeSearch, setActiveSearch] = useState<SearchProductsResponse | null>(null)
  const [query, setQuery] = useState<string | undefined>()
 
  const handelSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)

    if(value.length < 3) {
        setActiveSearch(null)
        return
    }

    const result = await searchProdutAction(value) as SearchProductsResponse

    if (result && typeof result !== 'string') {
        setActiveSearch(result)
      } else {
        setActiveSearch(null) // Define como `null` se não houver resultados
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
                        <div className="flex flex-row justify-between">
                            <span key={product.id} className="w-full rounded-sm p-2 text-sm hover:bg-accent">{product.name}
                                <Badge className="text-muted-foreground bg-accent text-[9px] ml-1 h-[16px]" variant="outline">product</Badge>
                            </span>
                        </div>
                    ))}
                </>
            )}

            {activeSearch.services.length > 0 && (
                <>
                    {activeSearch.services.map((service) => (
                        <span key={service.id} className="w-full rounded-sm p-2 text-sm hover:bg-accent">
                            {service.name}
                            <Badge className="text-muted-foreground bg-accent text-[9px] ml-1 h-[16px]" variant="outline">service</Badge>
                        </span>
                    ))}
                </>
            )}

            {activeSearch.packages.length > 0 && (
                <>
                    {activeSearch.packages.map((packageItem) => (
                        <span key={packageItem.id} className="w-full rounded-sm p-2 text-sm hover:bg-accent">
                            {packageItem.name}
                            <Badge className="text-muted-foreground text-[9px] ml-1 h-[16px]" variant="outline">package</Badge>
                        </span>
                    ))}
                </>
            )}
            </div>
        )}
        </form>
    )
}
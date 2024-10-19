import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import ProductDetailPage from "@/app/(app)/org/[slug]/products/[id]/page";
import GetProductAction from "@/app/(app)/org/[slug]/products/[id]/action";

export default async function ProductDetails({ params }: { params: { slug: string; id: string}}) {
    const product = await GetProductAction({org: params.slug, productId: params.id})
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Product Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ProductDetailPage product={product}/>
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
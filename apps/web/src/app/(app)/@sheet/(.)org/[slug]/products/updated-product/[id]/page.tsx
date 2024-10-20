import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import UpdatingProductPage from "@/app/(app)/org/[slug]/products/updated-product/[id]/page";

export default async function ProductUpdated({ params }: { params: { slug: string; id: string}}) {
    const {id, slug} = params
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Product Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <UpdatingProductPage params={{id, slug}}/>
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import ProductDetailPage from "@/app/(app)/org/[slug]/products/[id]/page";

export default function ProductDetails() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Product Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ProductDetailPage />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
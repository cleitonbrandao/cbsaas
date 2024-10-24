import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import { ProductForm } from "@/app/(app)/org/[slug]/products/create-product/product-form";

export default function CreateProject() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Create product</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ProductForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
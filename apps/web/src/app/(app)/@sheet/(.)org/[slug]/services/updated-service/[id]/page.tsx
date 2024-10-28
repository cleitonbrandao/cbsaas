import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import UpdatingServicePage from "@/app/(app)/org/[slug]/services/updated-service/[id]/page";

export default async function ServiceUpdated({ params }: { params: { slug: string; id: string}}) {
    const {id, slug} = params
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Service Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <UpdatingServicePage params={{id, slug}}/>
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
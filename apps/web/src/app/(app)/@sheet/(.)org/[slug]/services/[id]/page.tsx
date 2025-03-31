import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import ServiceDetailPage from "@/app/(app)/org/[slug]/services/[id]/page";
import GetServiceAction from "@/app/(app)/org/[slug]/services/[id]/action";

export default async function ServiceDetails({ params }: { params: { slug: string; id: string}}) {
    const service = await GetServiceAction({org: params.slug, serviceId: params.id})
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Service Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ServiceDetailPage service={service}/>
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
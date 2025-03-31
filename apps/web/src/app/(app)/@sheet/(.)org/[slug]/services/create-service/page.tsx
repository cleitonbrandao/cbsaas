import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";
import { ServiceForm } from "@/app/(app)/org/[slug]/services/create-service/service-form";
export default function CreateService() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Create service</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ServiceForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProjectForm } from "@/app/(app)/org/[slug]/create-project/project-form";
import { InterceptedSheetContent } from "@/components/intercept-sheet-content";

export default function CreateProject() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Create project</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <ProjectForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
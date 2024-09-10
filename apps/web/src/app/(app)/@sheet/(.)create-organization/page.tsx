import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { OrganizaitonForm } from '../../create-organization/organization-form'
import { InterceptedSheetContent } from '@/components/intercept-sheet-content'

export default function createOrganization() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Create organization.</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <OrganizaitonForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}
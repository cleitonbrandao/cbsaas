import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { OrganizaitonForm } from '../../create-organization/organization-form'
export default function createOrganization() {
    return (
        <Sheet defaultOpen>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create organization.</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <OrganizaitonForm />
                </div>
            </SheetContent>
        </Sheet>
    )
}
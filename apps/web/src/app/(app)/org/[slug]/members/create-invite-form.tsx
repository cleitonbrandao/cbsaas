'use client'

import { useFormState } from "hooks/use-form-state"
import { CreateInviteAction } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger,  SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function CreateInviteForm() {
    const [{success, message, errors}, handelSubmit, isPending] = useFormState(CreateInviteAction)
    console.log(success)
    return(
        <form onSubmit={handelSubmit} className="space-y-4">
            {success === false && message && (
            <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Invite failed!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex items-center gap-2">
                <div className="space-y-1 flex-1">
                    <Input name="email" type="email" id="email" placeholder="jhon@exemplo.com"/>

                    {errors?.email && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                <Select name="role" defaultValue="MEMBER">
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="BILLING">Billing</SelectItem>
                    </SelectContent>
                </Select>

                
                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin"/>
                        </>
                    ) : (
                        <>
                            <UserPlus className="size-4 mr-2" />
                            Invite user
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
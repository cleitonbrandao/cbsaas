'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormState } from 'hooks/use-form-state';

import { createOrganizationAction, OrganizationSchema, updateOrganizationAction } from './actions';

interface OrganizationFormProps {
    isUpdating?: boolean
    initialData?: OrganizationSchema
}

export function OrganizaitonForm({
    isUpdating = false,
    initialData,    
}: OrganizationFormProps) {
    const formAction = isUpdating ? updateOrganizationAction : createOrganizationAction
    const [{success, message, errors}, handleSubmit, isPending] = useFormState(formAction)
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
            {success === false && message &&(
                <Alert variant="destructive">
                    <AlertTriangle className="size-4"/>
                    <AlertTitle>Save organization failde!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            {success === true && message &&(
                <Alert variant="success">
                    <AlertTriangle className="size-4"/>
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="space-y-1">
                <Label htmlFor="name">Organizaiton name</Label>
                <Input name="name" id="name" defaultValue={initialData?.name}/>

                {errors?.name && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.name[0]}</p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="domain">E-mail domain</Label>
                <Input name="domain" type="text" id="domain" inputMode="url" placeholder="exemplo.com" defaultValue={initialData?.domain ?? undefined}/>

                {errors?.domain && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.domain[0]}</p>
                )}
            </div>

            <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                    <Checkbox name="shouldAttachUserByDomain" id="shouldAttachUserByDomain" className="translate-y-0.5" defaultChecked={initialData?.shouldAttachUserByDomain}/>
                    <label htmlFor="shouldAttachUserByDomain" className="space-y-1">
                        <span className="text-sm font-medium leading-none">Auto-join members</span>
                        <p>This is will automatically invite all member with 
                            same e-mail domain to this is organizaiton</p>
                    </label>
                </div>

                {errors?.shouldAttachUserByDomain && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.shouldAttachUserByDomain[0]}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <Loader2 className="size-4 animate-spin"/>
                ) : (
                    'Save organizaiton'
                )}
            </Button>
        </form>
    )
}
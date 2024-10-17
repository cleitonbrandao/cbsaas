'use client'

import { useFormState } from "hooks/use-form-state";
import { createProductAction } from "./actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { queryClient } from "@/lib/react-query";
import { Monetary } from "@/components/Inputs/InputMonetary/Monetary";

export function ProductForm() {
    const {slug: org} = useParams<{slug: string}>()

    const [{success, message, errors}, handleSubimt, isPending] = useFormState(
        createProductAction,
    () => {
        queryClient.invalidateQueries({
            queryKey: [org, 'projects']
        })
    })

    return (
        <form onSubmit={handleSubimt} className="space-y-4">
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Save product failed!</AlertTitle>
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
                <Label htmlFor="name">name</Label>
                <Input name="name" type="text" id="name"/>

                {errors?.name && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.name[0]}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description"/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.description[0]}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="price">Price</Label>
                <Monetary name="price" id="price"/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.price[0]}
                    </p>
                )}
            </div>
            
            <div className="space-y-1">
                <Label htmlFor="price_cost">Price cost</Label>
                <Monetary name="price_cost" id="price_cost"/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.price_cost[0]}
                    </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="size-4 animate-spin"/>
                    </>
                ) : (
                    'Save product'
                )}
            </Button>
        </form>
    )
}
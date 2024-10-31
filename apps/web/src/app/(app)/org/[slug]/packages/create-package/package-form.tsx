'use client'

import { useFormState } from "hooks/use-form-state";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Monetary } from "@/components/Inputs/InputMonetary/Monetary";
import { createPackageAction, PackageSchema, updatePackageAction } from "./action";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PackageFormProps {
    isUpdating?: boolean
    initialData?: PackageSchema
}

export function PackageForm({
    isUpdating = false,
    initialData,
}: PackageFormProps) {
    const formAction = isUpdating ? updatePackageAction : createPackageAction
    const {slug: org} = useParams<{slug: string}>()

    const [{success, message, errors}, handleSubmit, isPending] = useFormState(formAction)

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Save package failed!</AlertTitle>
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

            {isUpdating && initialData?.id && (
                <input type="hidden" name="id" value={initialData.id} />
            )}
            
            <div className="space-y-1">
                <Label htmlFor="name">name</Label>
                <Input name="name" type="text" id="name" defaultValue={initialData?.name}/>

                {errors?.name && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.name[0]}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description" defaultValue={initialData?.description ?? "No description."}/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.description[0]}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="price">Price</Label>
                <Monetary name="price" id="price" defaultValue={initialData?.price ?? "0"}/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.price[0]}
                    </p>
                )}
            </div>
            
            {/* <div className="space-y-1">
                <Label htmlFor="price_cost">Price cost</Label>
                <Monetary name="price_cost" id="price_cost" defaultValue={initialData?.price_cost ?? "0"}/>

                {errors?.description && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.price_cost[0]}
                    </p>
                )}
            </div> */}

            {errors?.items[0] && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {errors.items[0]}
                </p>
            )}
            <div className="flex flex-row gap-3 rounded-sm border p-3">
                <div className="space-y-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Album</CardTitle>
                            <CardDescription className="line-clamp-3">Descrição de produto que pode ser muito grande, porém vamos fazer o teste para ver se funciona</CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="relative">
                            <div className="flex flex-row gap-3">
                                <Badge className="flex border-green-200 hover:bg-green-300 justify-center text-muted-foreground hover:text-green-900 text-xs" variant="outline">R$ 3.000,00</Badge>
                                <Badge className="min-w-[100px] max-h-[25px] border-red-200 hover:bg-red-300 justify-center text-muted-foreground hover:text-red-900 text-xs" variant="outline">R$ 2.000,00</Badge>
                            </div>
                            <Badge className="absolute bottom-0 right-0 justify-center bg-gray-700 text-muted-foreground text-xs m-2" variant="outline">Serviço</Badge>
                        </CardFooter>
                    </Card>
                </div>
                <div className="space-y-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Book</CardTitle>
                            <CardDescription className="line-clamp-3">Descrição de produto que pode ser muito grande, porém vamos fazer o teste para ver se funciona</CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="relative">
                            <div className="flex flex-row gap-3">
                                <Badge className="flex border-green-200 hover:bg-green-300 justify-center text-muted-foreground hover:text-green-900 text-xs" variant="outline">R$ 5.000,00</Badge>
                                <Badge className="min-w-[100px] max-h-[25px] border-red-200 hover:bg-red-300 justify-center text-muted-foreground hover:text-red-900 text-xs" variant="outline">R$ 1500,00</Badge>
                            </div>
                            <Badge className="absolute bottom-0 right-0 justify-center bg-acccent text-muted-foreground text-xs m-2" variant="outline">Produto</Badge>
                        </CardFooter>
                    </Card>
                </div>
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
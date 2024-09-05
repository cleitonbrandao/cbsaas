'use client'

import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { AlertTriangle } from "lucide-react"

import googleIconSvg from '@/assets/google-icon.svg'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState } from "hooks/use-form-state"
import { signUpActions } from "./actions"

export function SignUpForm() {
    const router = useRouter()

    const [{success, message, errors}, handleSubmit, isPending] =  useFormState(
        signUpActions,
        () => {
            router.push('/auth/sign-in')
        }
    )

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">

                    { success === false && message && (
                        <Alert variant="destructive">
                            <AlertTriangle className="size-4"/>
                            <AlertTitle>Sign in failed!</AlertTitle>
                            <AlertDescription>
                                <p>{message}</p>
                            </AlertDescription>
                        </Alert>
                    )}

                <div className="space-y-1">
                    <Label>Name</Label>
                    <Input name="name" type="text" id="name"/>

                    {errors?.name && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.name[0]}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label>E-mail</Label>
                    <Input name="email" type="email" id="email"/>

                    {errors?.email && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label>Password</Label>
                    <Input name="password" type="password" id="password"/>

                    {errors?.password && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password[0]}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label>Confirm password</Label>
                    <Input name="password_confimation" type="password" id="password_confimation"/>

                    {errors?.password_confimation && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password_confimation[0]}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                    { isPending ? <Loader2 className="size-4 animate-spin"/> : 'Create account.' }            
                </Button>

                <Button variant="link" className="w-full" size="sm" asChild>
                    <Link href="/auth/sign-in">
                        Already register? Sign In
                    </Link>
                </Button>
            </form>
            
            <Separator />
            <form action="">
                <Button type="submit" variant="outline" className="w-full">
                    <Image src={googleIconSvg} className="size-4 mr-2" alt="" />
                    Sign Up With Google
                </Button>
            </form>
        </div>
    )
}
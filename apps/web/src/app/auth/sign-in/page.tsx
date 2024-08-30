import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"
import  Link  from "next/link"
import Image from "next/image"

import googleIconSvg from '@/assets/google-icon.svg'

export default function SignInPage() {
    return (
        <form action="" className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email"/>
            </div>

            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" id="password"/>

                <Link 
                    href="auth/forgot-password" 
                    className="text-xs font-medium text-foreground hover:underline"
                >
                    Forgot your password?
                </Link>
            </div>

            <Button type="submit" className="w-full">Sign in with e-mail</Button>

            <Separator />

            <Button type="submit" variant="outline" className="w-full">
                <Image src={googleIconSvg} className="size-4 mr-2" alt=""/>
                Sign In with Google
            </Button>
        </form>
    )
}
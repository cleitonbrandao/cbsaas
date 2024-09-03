import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import googleIconSvg from '@/assets/google-icon.svg'
import Link from "next/link"


export default function SignUpPage() {
    return (
        <form action="" className="space-y-4">
            <div className="space-y-1">
                <Label>Name</Label>
                <Input name="name" type="text" id="name"/>
            </div>

            <div className="space-y-1">
                <Label>E-mail</Label>
                <Input name="email" type="email" id="email"/>
            </div>

            <div className="space-y-1">
                <Label>Password</Label>
                <Input name="password" type="password" id="password"/>
            </div>

            <div className="space-y-1">
                <Label>Confirm password</Label>
                <Input name="confirm-password" type="password" id="confirm-password"/>
            </div>

            <Button type="submit" className="w-full">
                Create Acount
            </Button>

            <Button variant="link" className="w-full" size="sm" asChild>
                <Link href="/auth/sign-in">
                    Already register? Sign In
                </Link>
            </Button>

            <Separator />

            <Button type="submit" variant="outline" className="w-full">
                <Image src={googleIconSvg} className="size-4 mr-2" alt="" />
                Sign Up With Google
            </Button>
        </form>
    )
}
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { getInvite } from "http/get-invite"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Separator } from "@/components/ui/separator"
import { auth, isAuthenticated } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import { CheckCircle, LogIn, LogOut } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { acceptInvite } from 'http/accept-invite';
import Link from "next/link"

dayjs.extend(relativeTime)

interface InvitePageProps {
    params: {
        id: string
    }
}
export default async function InvitePage({params}: InvitePageProps) {
    const inviteId = params.id

    const {invite} = await getInvite(inviteId)

    const isUserAuthenticate = isAuthenticated()

    let currentUserEmail = null
    if(isUserAuthenticate) {
        const user  = await auth()

        currentUserEmail = user.email
    }

    const userIsAuthenticateWithSameEmailFromInvite = currentUserEmail === invite.email

    async function signInFromInvite() {
        'use server'

        cookies().set('inviteId', inviteId)

        redirect(`/auth/sign-in?email=${invite.email}`)
    }

    async function acceptInviteAction() {
        'use server'

        await acceptInvite(inviteId)

        redirect('/')
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6 flex flex-col justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="size-16">
                        {invite.author?.avatarUrl && (
                            <AvatarImage src={invite.author.avatarUrl} />
                        )}
                        <AvatarFallback />
                    </Avatar>

                    <p className="text-center leading-relaxed text-muted-foreground text-balance">
                        <span className="font-medium text-foreground">{invite.author?.name ?? 'Someone'}</span>{' '}
                         invited you to join <span className="font-medium text-foreground">{invite.organization.name}</span>{' '}
                         <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
                    </p>
                </div>

                <Separator />

                {!isUserAuthenticate && (
                    <form action={signInFromInvite}>
                        <Button type="submit" variant="secondary" className="w-full">
                            <LogIn className="size-4 mr-2"/>
                            Sign in to accept the invite
                        </Button>
                    </form>
                )}

                {userIsAuthenticateWithSameEmailFromInvite && (
                    <form action={acceptInviteAction}>
                        <Button type="submit" variant="secondary" className="w-full">
                            <CheckCircle className="size-4 mr-2"/>
                            Join {invite.organization.name}
                        </Button>
                    </form>
                )}

                {isUserAuthenticate && !userIsAuthenticateWithSameEmailFromInvite && (
                    <div className="space-y-4">
                        <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
                            This is invite was send to <span className="font-medium text-foreground">{invite.email}</span> but you are currently authenticate as <span className="font-medium text-foreground">{currentUserEmail}</span>
                        </p>


                        <div className="space-y-2">
                            <Button className="w-full" variant="secondary" asChild>
                                <a href="/api/auth/sign-out">
                                <LogOut className="size-4 mr-2"/>
                                    Sign out this {currentUserEmail}
                                </a>
                            </Button>

                            <Button className="w-full" variant="outline" asChild>
                                <Link href="/">
                                    Back to dashboard
                                </Link>
                            </Button>  
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
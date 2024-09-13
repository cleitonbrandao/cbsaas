import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { getInvite } from "http/get-invite"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Separator } from "@/components/ui/separator"
import { isAuthenticated } from "@/auth/auth"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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

    async function signInFromInvite() {
        'use server'

        cookies().set('inviteId', inviteId)

        redirect(`/auth/sign-in?email=${invite.email}`)
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
            </div>
        </div>
    )
}
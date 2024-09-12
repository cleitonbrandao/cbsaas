import { ability, getCurrentOrg } from "@/auth/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { organizationSchema } from "@cbsaas/auth"
import { GetMembers } from "http/get-members"
import { getMembership } from "http/get-membership"
import { GetOrganization } from "http/get-organization"
import { ArrowRightLeft, Crown, UserMinus } from "lucide-react"
import Image from "next/image"
import { removeMemberAction } from "./actions"

export async function MemberList() {
    const currentOrg = getCurrentOrg()
    const permission = await ability()

    const [{membership}, {members}, {organization}] = await Promise.all([
        getMembership(currentOrg!),
        GetMembers(currentOrg!),
        GetOrganization(currentOrg!),
    ])
    const authOrganization = organizationSchema.parse(organization)

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Members</h2>

            <div className="rounded border">
                <Table>
                    <TableBody>
                        {members.map(member => {
                            return (
                                <TableRow key={member.id}>
                                    <TableCell className="py-2.5" style={{width: 40}}>
                                        <Avatar>
                                            <AvatarFallback />
                                            {member.avatarUrl && (
                                                <Image src={member.avatarUrl} width={32} height={32} alt="" className="aspect-square size-full"/>
                                            )}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="py-2.5">
                                        <div className="flex flex-col">
                                            <span className="font-medium inline-flex items-center gap-2">
                                                {member.name}
                                                {member.userId === membership.userId && ' (me)'}
                                                {organization.ownerId === member.userId && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Crown className="size-3"/>
                                                        Owner
                                                    </span>
                                                )}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{member.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2.5">
                                        <div className="flex items-center justify-end gap-2">
                                            {permission?.can('transfer_ownership', authOrganization) && (
                                                <Button size="sm" variant="ghost">
                                                    <ArrowRightLeft className="size-4 mr-2"/>
                                                    Transfer ownership
                                                </Button>
                                            )}

                                            {permission?.can('delete', 'User') && (
                                                <form action={removeMemberAction.bind(null, member.id)}>
                                                    <Button size="sm" variant="destructive" disabled={member.userId === membership.userId || member.userId === organization.ownerId} type="submit" >
                                                        <UserMinus className="mr-2 size-4"/>
                                                        Remove
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
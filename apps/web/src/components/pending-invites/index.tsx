'use client'

import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, UserPlus2, X } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPendingInvites } from "http/get-pending-invites";
import { useState } from "react";
import { AccpetInviteAction, RejectInviteAction } from "./actions";
import { queryClient } from '../../lib/react-query';

dayjs.extend(relativeTime)

export function PendingInvites() {
    const queryClient = useQueryClient()

    const [isOpen, setIsOpen] = useState(false)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pending-invites'],
        queryFn: GetPendingInvites,
        enabled: isOpen,
    })

    async function handleAcceptInvite(inviteId: string) {
        await AccpetInviteAction(inviteId)
        
        queryClient.invalidateQueries({ queryKey: ['pending-invites']})
    }
    
    async function handleRejectIncite(inviteId: string) {
        await RejectInviteAction(inviteId)

        queryClient.invalidateQueries({ queryKey: ['pending-invites']})
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                    <UserPlus2 className="size-4"/>
                    <span className="sr-only">Pending invites</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 space-y-2">
                <span className="block text-sm font-medium">Pending invites  ({data?.invites.length ?? 0})</span>

                {data?.invites.length === 0 && (
                    <p className="text-sm text-muted-foreground">No invites found.</p>
                )}

                {data?.invites.map(invite => {
                    return(
                        <div className="space-y-2">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                <span className="font-medium text-foreground">
                                        {invite.author?.name ?? 'Someone'}    
                                </span>{' '}
                                invited you to join <span className="font-medium text-foreground">{invite.organization.name}</span>{' '}
                                <span>{dayjs(invite.createdAt).fromNow()}</span>
                            </p>

                            <div className="flex gap-1">
                                <Button onClick={() => handleAcceptInvite(invite.id)} size="xs" variant="outline">
                                    <Check className="size-3 mr-2"/>
                                    Accept
                                </Button>

                                <Button onClick={() => {handleRejectIncite(invite.id)}} size="xs" variant="ghost" className="text-muted-foreground">
                                    <X className="size-3 mr-2"/>
                                    Reject
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </PopoverContent>
        </Popover>
    )
}
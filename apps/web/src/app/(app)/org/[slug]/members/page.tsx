import { ability } from "@/auth/auth";
import { MemberList } from "./members-list";
import { Invites } from "./invites";

export default async function MembersPage() {
    const permission = await ability()

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Members</h1>

            <div className="space-y-4">
                { permission?.can('get', 'Invite') && <Invites />}
                { permission?.can('get', 'User') && <MemberList />}
            </div>
        </div>
    )
}
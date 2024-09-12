import { revalidateTag } from "next/cache";
import { api } from "./api-client";

interface RemoveMemberRequest {
    org: string
    memberId: string
}
export async function removeMemeber({
    org,
    memberId
}: RemoveMemberRequest) {
    await api.delete(`organizations/${org}/members/${memberId}`)
}
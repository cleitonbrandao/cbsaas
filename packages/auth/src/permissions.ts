import { AbilityBuilder } from "@casl/ability"
import { AppAbility } from "."
import { User } from "./models/user"
import { Role } from "./roles"


type PermissionByRole = 
(
    user: User,
    biuld: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionByRole> = {
    ADMIN(_, { can }) {
        can('manager', 'all')
    },
    MEMBER(_, { can }) {
        can('create', 'Project')
    },
    BILLING(_, { can }) {
        can('delete', 'Project')
    }
}
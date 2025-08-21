import _ from "lodash"
import { useContextUserGroupRoles } from "./useContextUserGroupRoles"

export const useContextUserGroupRolesInclude = async (role: string | Array<string>) => {
    const roles = await useContextUserGroupRoles()
    if (Array.isArray(role)) {
        return role.some((item) => roles.includes(item))
    }
    return roles.includes(role)
}

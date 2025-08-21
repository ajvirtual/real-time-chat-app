import { TUserGroup } from "@_types/base"
import { useContextUser } from "./useContextUser"

export const useContextUserGroups = async () => {
    const user = await useContextUser()
    const groups = await TUserGroup.find({
        where: {
            invitations: {
                user: { id: user.id }
            }
        }
    })
    return groups
}

import _ from "lodash"
import { useContextOrganisationActive } from "./useContextOrganisationActive"
import { useContextUser } from "./useContextUser"
import { TUserGroupInvitation } from "@_types/base"

export const useContextUserGroupRoles = async () => {
    const organisation = await useContextOrganisationActive()
    const user = await useContextUser()

    if (!organisation && user) {
        return []
    }

    const groupInvitation = await TUserGroupInvitation.findOne({
        where: {
            user: { id: user?.id },
            group: {
                organisation: { id: organisation?.id }
            }
        }
    })

    const group = await groupInvitation?.group
    const groupRoles = await group?.roles
    const groupRoles_ = groupRoles?.map((item) => item.value) || []

    const licenseTransaction = await organisation?.licenseTransaction
    const licence = await licenseTransaction?.license
    const licenseRoles = await licence?.roles
    const licenseRoles_ = licenseRoles?.map((item) => item.value) || []

    return groupRoles_.filter((rg) => licenseRoles_.includes(rg))

}

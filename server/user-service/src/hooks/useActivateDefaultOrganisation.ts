import { TSession, TSessionUser, TUser, TUserOrganisation, useContext } from "@chat/graphql"
import { AuthCode } from "controllers/session/hooks/user/useUserAuth"
import moment from "moment"
import { MoreThan } from "typeorm"

export const useActivateDefaultOrganisation = async (sessionUser: TSessionUser) => {

    const context = await useContext()
    const user = await sessionUser.user
    // Check if user is attached to organisation `organisationKey: DEVELOPPER`
    const organisation = await TUserOrganisation.findOne({
        where: {
            groups: {
                invitations: {
                    user: { id: user.id }
                }
            },
            licenseTransaction: context.appName === 'bo'
                ? {
                    dateEnd: MoreThan(moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)),
                    license: {
                        ke: 'DEVELOPPER'
                    }
                }
                : undefined
        }
    })


    if (!organisation) {
        throw AuthCode.UNAUTHORIZED_APP
    }

    if (organisation.isDisabled) {
        throw AuthCode.ORGANISATION_DISABLED
    }

    sessionUser.organisation = organisation
    await sessionUser.save()
}

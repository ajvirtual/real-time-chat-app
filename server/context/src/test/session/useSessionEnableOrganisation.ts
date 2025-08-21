import { TSessionUser, TUserOrganisation } from "@chat/graphql"

export const useSessionEnableOrganisation = async (token: string, orgId: number) => {
    const sessionUser = await TSessionUser.findOne({ where: { session: { token }, active: true } })
    const organisation = await TUserOrganisation.findOne({ where: { id: orgId } })
    sessionUser.organisation = organisation
    await sessionUser.save()
}

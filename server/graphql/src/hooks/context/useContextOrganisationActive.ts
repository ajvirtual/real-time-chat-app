import { useContextSessionUser } from "./useContextSessionUser"

export const useContextOrganisationActive = async () => {
    const sessionUser = await useContextSessionUser()
    return sessionUser?.organisation
}

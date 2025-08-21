import { useContextUserGroups } from "./useContextUserGroups"

export const useContextUserOrganisations = async () => {
    const groups = await useContextUserGroups()
    return Promise.all(groups.map((item) => item.organisation))
}

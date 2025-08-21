import { useContextSessionUser } from "./useContextSessionUser"

export const useContextSession = async () => {
    const sessionUser = await useContextSessionUser()
    return sessionUser?.session
}
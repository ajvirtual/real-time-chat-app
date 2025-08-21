import { TAppContext } from "@_types/base"
import { useContext } from "./useContext"

export const useContextSessionUser = () => {
    const context: TAppContext = useContext()
    return context.sessionUser
}

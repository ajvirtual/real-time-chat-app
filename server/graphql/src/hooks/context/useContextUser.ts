import { useContext } from "@hooks/context/useContext"
import { TAppContext } from "@_types/base"

export const useContextUser = async () => {
    const context: TAppContext = useContext()
    const user = await context?.sessionUser?.user
    return user
}

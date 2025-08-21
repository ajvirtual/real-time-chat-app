import { RoutesState } from "@state/RoutesState"
import { useRecoilValue } from "recoil"

export const useRouterRoutes = () => {
    return useRecoilValue(RoutesState)
}

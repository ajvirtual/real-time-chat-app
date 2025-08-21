import { useRecoilValue } from "recoil"
import { HubState } from "../../state/HubState"

export const useHub = () => {
    return useRecoilValue(HubState)
}

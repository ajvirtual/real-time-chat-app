import { Ajax } from "@chat/lib"
import { AjaxState } from "@state/AjaxState"
import { useRecoilValue } from "recoil"

export const useAjax = (): Ajax => {
    return useRecoilValue(AjaxState)
}

import { useMzQuery } from ".."
import { useAjax } from "./useAjax"

export const useAjaxQueryToken = (enabled: boolean) => {
    const ajax = useAjax()

    return useMzQuery('Ajax.token', () => ajax?.get(`session/token`), { enabled, suspense: true })
}

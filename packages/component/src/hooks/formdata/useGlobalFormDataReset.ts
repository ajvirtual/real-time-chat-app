import { useResetRecoilState } from "recoil"
import { FormDataState } from "@hooks/formdata/FormDataState"

export const useGlobalFormDataReset = (id: string) => {
    return useResetRecoilState(FormDataState(id))
}

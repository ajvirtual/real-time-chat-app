import { useRecoilState } from "recoil"
import { FormDataDirtyState } from "@hooks/formdata/FormDataState"

export const useGlobalFormDataDirtyState = (id: string) => {
    return useRecoilState(FormDataDirtyState(id))
}

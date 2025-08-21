import { useRecoilState } from "recoil"
import { FormDataErrorState } from "@hooks/formdata/FormDataState"

export const useGlobalFormDataError = (id: string) => {
    return useRecoilState(FormDataErrorState(id))
}

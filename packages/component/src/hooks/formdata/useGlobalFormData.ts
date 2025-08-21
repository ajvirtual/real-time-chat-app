import _ from "lodash"
import { useEffect } from "react"
import { SetterOrUpdater, useRecoilState } from "recoil"
import { FormDataState } from "@hooks/formdata/FormDataState"

export const useGlobalFormData = <TData extends {} = Record<string, any>>(id: string, defaultValue?: TData): [TData, SetterOrUpdater<TData>] => {
    const [formData, setFormData] = useRecoilState(FormDataState(id))

    useEffect(() => {
        if (defaultValue && !_.isEmpty(defaultValue)) {
            setFormData((v) => ({ ...v, ...defaultValue }))
        }
    }, [])

    return [formData as TData, setFormData as SetterOrUpdater<TData>]
}

import { useGlobalFormDataDirtyState } from "./useGlobalFormDataDirtyState"

export const useFormDataIsDirty = (id: string) => {
    const [isDirty] = useGlobalFormDataDirtyState(id)
    return isDirty
}

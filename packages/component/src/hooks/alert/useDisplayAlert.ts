import { useSetRecoilState } from "recoil"
import { AlertListState } from "@state/AlertListState"
import { AlertProps } from "../../components/alert/Alert"
import { useCallback } from "react"
import { generate } from 'randomstring'
import _ from "lodash"

export const useDisplayAlert = () => {

    const setAlertList = useSetRecoilState(AlertListState)

    const addAlert = useCallback((alert: AlertProps) : string => {
        const id = generate(5)
        setAlertList((l) => {
            const list  = [...l]
            const index = list.findIndex((item) => item.id === alert.id)
            if (index !== -1) {
                list.splice(index, 1, alert)
            } else {
                list.push({ id, ...alert })
            }
            return list
        })
        return id
    }, [])

    return addAlert
}

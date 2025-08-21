import { useSetRecoilState } from "recoil"
import { AlertProps } from "../../components/alert/Alert"
import { useCallback } from "react"
import _ from "lodash"
import { AlertListState } from "@state/AlertListState"

export const useRemoveAlert = () => {

    const setAlertList = useSetRecoilState(AlertListState)

    const removeAlert = useCallback((alert: AlertProps) => {
        setAlertList((l) => {
            return l.filter((item) => !_.isEqual(item, alert))
        })
    }, [])

    return removeAlert
}

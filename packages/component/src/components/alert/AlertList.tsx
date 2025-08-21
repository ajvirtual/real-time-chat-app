import React, { useCallback, useMemo } from 'react'
import { Alert, AlertProps } from './Alert'
import { useRecoilState } from 'recoil'
import { AlertListState } from '@state/AlertListState'
import './css/alert-list.css'
import { useTranslation } from '@hooks/translation'

/**
 * Render a floating alert wrapper on the screen
 */
export const AlertList = ({ alerts, positionX, positionY, excludeTypes }: AlertListProps) => {

    const t = useTranslation()
    const [alertList, setAlertList] = useRecoilState(AlertListState)

    const removeAlert = useCallback((index?: number) => {
        setAlertList((l) => {
            const list = [...l]
            list.splice(index, 1)
            return list
        })
    }, [alertList])

    const _alerts = useMemo(() => {
        let combined = [
            ...(alertList || []),
            ...(alerts || [])
        ];
        if (excludeTypes && excludeTypes.length > 0) {
            combined = combined.filter(item => !excludeTypes.includes(item.type));
        }
        return combined;
    }, [alertList, alerts, excludeTypes])

    return (
        <div className={`alert-wrapper alert-x-${positionX} alert-y-${positionY}`}>
            {
                _alerts.map((item, index) => (
                    <Alert
                        key={index}
                        dismissTimeout={5000}
                        isDismissible
                        {...item}
                        text={t(item.text)}
                        onClose={() => removeAlert(index)}
                    />

                ))
            }

        </div>
    )
}

AlertList.defaultProps = {
    positionX: 'center',
    positionY: 'top',
    excludeTypes: [],
}

export type AlertListProps = {
    alerts?: Array<AlertProps>
    /** Position horizontal on the screen */
    positionX?: 'left' | 'center' | 'right'
    /** Position veritacal on the screen */
    positionY?: 'top' | 'center' | 'bottom'
    /** Exclude these alert types from showing */
    excludeTypes?: Array<'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'>
}

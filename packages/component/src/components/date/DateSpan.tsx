import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { HTMLAttributes } from "react"

export const DateSpan = ({ value, interval, normalFormat = false, format, ...props }: DateSpanProps) => {

    const getTimeSpan = useCallback(() => {
        return moment(value, ['x', moment.HTML5_FMT.DATETIME_LOCAL, moment.HTML5_FMT.DATETIME_LOCAL_MS, moment.ISO_8601]).fromNow()
    }, [value])
    
    const [timeSpan, setTimeSpan] = useState<string>(() => getTimeSpan())

    useEffect(() => {
        if (interval !== 0) {
            setInterval(() => setTimeSpan(getTimeSpan()), interval || 10000)
        }
    }, [])

    return (
        <span {...props} className={`text-[14px] ${props.className}`} title={moment(value, 'x').format('DD/MM/YYYY HH:mm')}>
            { (normalFormat || format) ? moment(value).format(format ?? 'DD-MM-YYYY') : timeSpan }
        </span>
    )
}

export type DateSpanProps = HTMLAttributes<HTMLSpanElement> & {
    value: string | Date
    interval?: number
    normalFormat?: boolean
    format?: string
}

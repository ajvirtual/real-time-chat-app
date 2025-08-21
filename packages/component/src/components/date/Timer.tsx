import moment from "moment"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDateNowCompared } from "./hooks/useDateNowCompared"

export const Timer = (props: TimerProps) => {

    const getDateCompared = useDateNowCompared()

    const getDiff = useCallback((value: string) => {
        const { diff: date_span } = getDateCompared(value, 'x')
        return moment.duration((date_span + 1), 'seconds')
    }, [])

    const get_is_negative = useCallback((value: string) => {
        const { negative } = getDateCompared(value, 'x')
        return negative
    }, [])

    const [duration, setDuration] = useState<moment.Duration>(getDiff(props.value))
    const [is_negative, set_is_negative] = useState<boolean>(get_is_negative(props.value))
    const _interval = useRef<NodeJS.Timeout>()

    useEffect(() => {
        return () => {
            clearTimeout(_interval.current!)
        }
    }, [])

    useEffect(() => {
        setDuration(getDiff(props.value))
    }, [props.value])

    useEffect(() => {
        if (!props.disabled) {
            clearInterval(_interval.current!)
            beginAnimation()
            setDuration(getDiff(props.value))
            set_is_negative(get_is_negative(props.value))
        }
    }, [props.value, props.disabled])


    const beginAnimation = () => {
        _interval.current = setInterval(() => {
            setDuration(getDiff(props.value))
            set_is_negative(get_is_negative(props.value))
        }, props.interval || 1000) as any
    }

    const time = useMemo(() => {
        let str = ''
        if (duration?.hours() > 0) {
            str += `${duration?.hours()}:`
        }
        
        str += `${duration?.minutes()}:`
        str += `${duration?.seconds().toString().padStart(2, '0')}`
        return str
    }, [duration])

    return (
        <span {...props} data-testid="timer-value" className={`timer ${props.className || ''} ${is_negative ? 'negative' : ''}`}>
            {time}
        </span>
    )
}

export type TimerProps = React.HTMLAttributes<HTMLSpanElement> & {
    /**
     * Date time before or after now
     */
    value: string
    interval?: number
    disabled?: boolean
}

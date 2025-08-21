
import moment from 'moment';
import { useCallback } from 'react'

export const useDateNowCompared = () => {

    return useCallback((value: string, format: string = 'UTC') => {
        const date_now = moment();
        const date_to_compare = moment(value, format);
        return {
            diff: date_to_compare.diff(date_now, 'seconds'),
            negative: date_now.isBefore(date_to_compare)
        }
    }, [])
}

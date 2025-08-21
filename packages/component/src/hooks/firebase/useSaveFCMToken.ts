
import { useAjax } from '@hooks/ajax/useAjax'
import { useGraphqlMutation, useMzMutation } from '../query'
import { AjaxResponseType } from '@chat/lib'

export const useSaveFCMToken = () => {

    const ajax = useAjax()
    return useMzMutation<AjaxResponseType, string>(async (token) => ajax?.send({
        type: 'POST',
        url: 'notification/fcm',
        content_type: 'application/json',
        data: {
            token: token
        } as Record<string, any>,
        data_type: 'json'
    }))
}

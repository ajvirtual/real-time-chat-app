import { atom, selector } from "recoil";
import { Ajax } from '@chat/lib'

export const buildAjax = () => {
    return new Ajax({
        base_url: process.env.REACT_APP_API_ENDPT as string,
        graphql: process.env.REACT_APP_GRAPHQL_ENDPT as string,
        app_name: process.env.REACT_APP_NAME,
    })
}

export const AjaxState = atom<Ajax>({
    key: 'state.Ajax',
    default: buildAjax()
})

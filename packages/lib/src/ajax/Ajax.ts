import { symetricEncrypt, try_parse_json } from '../utils'

/**
 * It's a library for sending request usign XmlHttpRequest how's has syntax Jquery friendly and designed for codeigniter REST API. 
 * Except, it use snake instead camel. 
 * It's recommended to use it in one instance for handling cached.
 */
export class Ajax {

    base_url: string

    assets_url?: string

    token_index?: string

    app_name?: string

    graphql_endpt?: string

    onTokenChange?: (token?: string) => void

    constructor({ base_url, assets_url, token_index = 'x-app-token', app_name, graphql }: AjaxPropType){
        this.base_url = base_url
        this.assets_url = assets_url
        this.token_index = token_index
        this.app_name = app_name
        this.graphql_endpt = graphql
    }

    /**
     * Search token inside local storage
     */
    find_token(key?: string): string | null{
        return localStorage.getItem(key as string)
    }

    /**
     * Get stored token
     */
    get_token(): string | null{
        return this.find_token(this.token_index)
    }

    /**
     * Set token to local storage
     * @param value New token
     */
    set_token(value?: string): void{
        localStorage.setItem(this.token_index as string, value as string)
        this.onTokenChange?.(value)
    }

    /**
     * Clear token
     */
    clear_token() {
        localStorage.removeItem(this.token_index!)
    }

    /**
     * 
     * @public
     * @param {string} uri the path you wanna reach
     * @returns {string} It's return the url pointing to remote based on assets_url props
     */
    assets(uri: string){
        let result = ''
        if (this.assets_url) {
            uri = uri.replace(this.assets_url, '')
            result = this.assets_url
            result += uri
        }
        else{
            result = uri
        }

        return result
    }

    /**
     * It's return the url pointing to remote
     * @public
     * @param {string} uri the path you wanna reach
     * @param {object|string} data the data who's pass to the url (transformed to url_encoded string)
     * @returns {string} the url based on base_url props
     */
    site_url(uri: string, data?: UrlParamType | string) {

        let result = ''

        if (this.base_url) {
            uri = uri.replace(this.base_url, '')
            result = this.base_url
            result += uri
        }
        else{
            result = uri
        }

        if (data) {
            let param_string = this.get_url_encoded(data as UrlParamType)
            let should_insert_sep = true
            if (!result.includes('?')) {
                result += '?'
                should_insert_sep = false
            }

            result += !result.includes('&') && should_insert_sep ? '&' : ''
            result += param_string.length > 0 ? param_string : ''
        }

        result = result.replace('?&', '')
        result = result.replace(/\/$/g, '')

        return result
    }

    /**
     * Sending simple GET request. return text/plain when resolved
     * @public     * 
     * @param {string} url 
     * @param {object|string} data data to send with the request
     * @returns {Promise}
     */
    async get(url: string, data?: RequestParamType){

        const { response } = await this.send({
            url: url,
            data: data,
            data_type: 'text/plain',
            type: 'GET',
        })

        return response
    }

    /**
     * Sending simple GET request. return application/json when resolved
     * @public
     * @param {string} url 
     * @param {object|string} data data to send with the request
     * @returns {Promise}
     */
    async get_json(url: string, data?: RequestParamType){

        const { response } = await this.send({
            url: url,
            data: data,
            data_type: 'json',
            type: 'GET',
        })

        return response
    }

    /**
     * Sending simple POST request. return application/json when resolved
     * @public
     * @param {string} url 
     * @param {object|string} data data to send with the request
     * @returns {Promise}
     */
    async post(url: string, data: RequestParamType, content_type?: RequestContentType){

        const { response } =  await this.send({
            url: url,
            data: data,
            data_type: 'json',
            type: 'POST',
            content_type
        })

        return response
    }

    /**
     * Transform object to FormData instance
     * @param {object} data 
     * @returns
     */
    get_form_data(data: FormData | RequestParamType) : FormData{
        if (data instanceof FormData) {
            return data
        }

        var form = new FormData();
        for(var prop in data){
            if (data[prop]) {
                form.append(prop, data[prop]);
            }
        }

        return form
    }

    /**
     * Transform object to uri GET query
     * @param {object} data 
     */
    get_url_encoded(data?: UrlParamType) : string{
        let str = ''

        for(var prop in data){
            if(Array.isArray(data[prop])){
                const adr = data[prop] as Array<string>
                adr.forEach((item: string) => str += `${prop}[]=${item}&`)
            }
            else if (data[prop]) {
                str += prop + '=' + data[prop] + '&'
            }
        }

        return str.substring(0, str.length - 1)
    }

    /**
     * Get content type of the request, parse data in term of "type"
     * @param {string} type 
     * @param {object} data Data to compile
     */
    get_content_type(type?: RequestContentType, data?: RequestParamType | UrlParamType){
        // Todo : handle more content type
        switch(type){
            case 'application/x-www-form-urlencoded':
            case 'urlencoded':
                return { data: this.get_url_encoded(data as UrlParamType), type: 'application/x-www-form-urlencoded; charset=utf-8' }

            case 'application/json':
            case 'json':
                return { data: JSON.stringify(data), type: 'application/json; charset=utf-8' }

            default:
                return { data: this.get_form_data(data as RequestParamType) }
        }
    }

    send<TData = any>(param: AjaxRequestType): Promise<AjaxResponseType<TData>>{
        const xhr = new XMLHttpRequest()

        param.url = param.type === 'GET' ? this.site_url(param.url, param.data as UrlParamType) : this.site_url(param.url)
        const token = this.find_token(this.token_index)
        const content_type = this.get_content_type(param.content_type, param.data).type
        xhr.open(param.type, param.url, true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        token && xhr.setRequestHeader('x-app-token', token)
        this.app_name && xhr.setRequestHeader('x-app-name', this.app_name)
        content_type && xhr.setRequestHeader('Content-type', content_type)
        xhr.upload.addEventListener("progress", (e) => param.progress?.(e), false)
        if (param.data_type === 'application/octet-stream') {
            xhr.responseType = 'arraybuffer'
        }

        return new Promise<AjaxResponseType<TData>>((resolve, reject) => {
            xhr.addEventListener('readystatechange', () => {

                if (xhr.readyState === XMLHttpRequest.DONE) {

                    let response: string | ArrayBuffer | ResponseJSONType = xhr.response
                    if (param.data_type === 'json' || param.data_type === 'application/json') {
                        response = xhr.responseText
                        response = try_parse_json(response) as ResponseJSONType
                    }
                    
                    //success
                    if (xhr.status >= 200 && xhr.status < 300) {
                        param.success?.(response)
                        resolve({xhr, response: response as TData})
                    }

                    // redirect
                    if (xhr.status >= 300 && xhr.status < 400) {
                        resolve({ xhr, response: response as TData })
                    }

                    // error
                    if (xhr.status === 0 || (xhr.status >= 400 && xhr.status < 600)) {
                        param.error?.({ xhr, response })
                        reject({ xhr, response })
                    }
                }
            })
            
            xhr.send(param.type === 'GET' ? null : this.get_content_type(param.content_type, param.data).data)
        })
    }

}

export type RequestParamType = Record<string, string | Blob | File>
export type ResponseJSONType = Record<string, any>
export type UrlParamType = Record<string, string | Array<string> | number>
export type RequestContentType = 'application/x-www-form-urlencoded' | 'urlencoded' | 'application/json' | 'json'
export type AjaxResponseType<TData = ResponseJSONType | string | Blob | ArrayBuffer> = { xhr: XMLHttpRequest, response: TData }
export type AjaxRequestType = {
    /** Url of the request */
    url: string
    /** Request method */
    type: 'GET' | 'POST' | 'PUT' | 'DELETE'
    /** Data to send with the request */
    data?: UrlParamType | RequestParamType

    content_type?: RequestContentType
    /** Request response data type waited for */
    data_type?: 'json' | 'application/json' | 'text/plain' | 'application/octet-stream'
    /** Callback when http request is about to give progress */
    progress?: (e: ProgressEvent<XMLHttpRequestEventTarget>) => void
    /** Callback when request succed */
    success?: (response: ResponseJSONType | string | ArrayBuffer) => void
    /** Callback when error occured */
    error?: ({xhr, response} : AjaxResponseType) => void
}

export type AjaxPropType = {
    /** The base url pointing to remote, used by **site_url** method.(It's Codeigniter friendly) */
    base_url: string,
    /** To indicate the assets base url. (Always Codeigniter friendly) */
    assets_url?: string,
    /** Web token index name inside local storage */
    token_index?: string,
    /** App name sent with all request */
    app_name?: string,
    /** Graphql endpoint */
    graphql?: string,
}

export const getXhrFileName = (xhr: XMLHttpRequest) => {

    try {
        return xhr?.getResponseHeader('content-disposition')
                            ?.split(';')
                            ?.find(n => n.includes('filename='))
                            ?.replace('filename=', '')
                            ?.trim();
    } catch (e) {
        return undefined
    }
}


/**
 * Hooks to get link of file inside CDN server
 */
export const useCDN = () => {
    return (path?: string) => `${process.env.REACT_APP_CDN}${path}`
}

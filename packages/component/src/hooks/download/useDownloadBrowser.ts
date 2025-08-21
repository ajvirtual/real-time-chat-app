
/**
 * Return a function that will force the browser to download a blob as file
 */
export const useDownloadBrowser = () => {
    return (blob: Blob, fileName: string) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.classList.add('noAjax')
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

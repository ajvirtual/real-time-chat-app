import { useCallback, useEffect } from "react"
import { DocumentTitleState } from "@state/DocumentTitleState"
import { useRecoilState } from "recoil"
import _ from "lodash"

export const useSetCurrentDocumentTitle = (key: string, value: string) => {

    const [documentTitle ,setDocumentTitle] = useRecoilState(DocumentTitleState)

    useEffect(() => {
        if (!_.isEqual(documentTitle[key], value)) {
            setDocumentTitle((t: any = {}): any => {
                const titles = {...t} 
                titles[key] = value
                return titles
            })
        }
    }, [key, value])
}

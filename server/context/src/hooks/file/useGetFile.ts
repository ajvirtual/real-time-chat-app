import { TFile } from "@chat/graphql"
import { getFilePath } from "./useFileRepo"
import fs from 'fs'

export const useGetFile = async (id: number | string) => {
    let where: Record<string, any> = { id }
    if (typeof id === "string") {
        where = { hash: id }
    }
    const file = await TFile.findOne({
        where
    })

    if (!file) {
        throw 'NOT_FOUND'
    }
    const path = getFilePath(file?.hash || '')
    if (!fs.existsSync(path)) {
        throw 'FILE_NOT_FOUND'
    }

    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
    
}

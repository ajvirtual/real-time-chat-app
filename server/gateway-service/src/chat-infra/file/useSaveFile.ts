import { v4 as uuid } from 'uuid';
import fs from 'fs'
import { getFilePath, getFileRepo } from "./useFileRepo";
import { TFile } from '@chat/context';

export const useSaveFile = async (name: string, mimetype: string, buffer: Buffer) => {

    const f = new TFile()
    f.name = name
    f.hash = uuid()
    f.mimetype = mimetype
    await f.save()
    await saveFile(f.hash, buffer)
    return f
}


export const saveFile = (fileName: string, buffer: Buffer) => {

    return new Promise<void>((resolve, reject) => {
        if (!fs.existsSync(getFileRepo())) {
            fs.mkdirSync(getFileRepo(), { mode: '444' })
        }

        fs.writeFile(getFilePath(fileName), buffer, (err) => {
            if (err) {
                reject(err)
                throw new Error(`Error writing file: ${err}`)
            }
            resolve()
        })
    })
}

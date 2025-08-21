import { Request, Response } from 'express'
import fs from 'fs'
import { v4 as uuid } from 'uuid';
import { TFile } from '@chat/graphql'
import { ENV, useGetFile, useSaveFile } from '@chat/context';
import stream from 'stream'

if (ENV.NODE_ENV === 'test') {
    (global as any).FILE_REPO = `${__dirname}/../../../file-repo`
}

export const upload = async (req: Request, res: Response) => {

    const { file, body } = req
    if (!file) {
        return res.status(400).json({ message: 'NO_FILE_UPLOADED' })
    }

    try {
        const f = await useSaveFile(file.originalname, file.buffer)
        return res.status(200).json({ id: f.id, name: f.name })
    } catch (e) {
        return res.status(500).json({ message: 'INTERNAL_ERROR' })
    }
}

export const download = async (req: Request, res: Response) => {

    const { id } = req.params

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'EMPTY_ID' })
    }

    const file = await TFile.findOne({
        where: [
            { id: parseInt(id) },
            { hash: id }
        ]
    })

    if (file.value && isValidUrl(file.value)) {
        try {
            const imageStream = await fetch(file.value as string)
            const buf = Buffer.from(await imageStream.arrayBuffer())
            const rs = new stream.PassThrough();
            rs.end(buf);
            res.set('Content-Description', 'File Transfer');
            res.set('Content-disposition', 'attachment');
            res.set('Content-Type', 'application/octet-stream');
            return rs.pipe(res);
        } catch (e) {
            console.log('Failed to load image', e)
            res.status(500).send()
        }
    }

    if (!await file.canRead()) {
        return res.status(403).json({ message: 'FORBIDDEN' })
    }

    try {
        const buffer = await useGetFile(parseInt(id))
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + file.name,
            'Content-Length': buffer.length,
            "Cache-Control": "public, max-age=86400",
        });
        res.write(buffer);
        res.end();
    } catch (e) {
        console.log('[File]', e)
        return res.status(404).json({ message: e.message })
    }
}

const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (e) {
        return false;
    }
}
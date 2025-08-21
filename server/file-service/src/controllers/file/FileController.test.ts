import { TFile } from '@chat/graphql';
import FileRoutes from './FileRoutes'
import { closeDataSource, getRequest, getUserAgent, initGlobalApp, useSessionCreateToken } from '@chat/context';
import { IsNull, Not } from 'typeorm';


describe("File", () => {

    beforeAll(async () => {
        await initGlobalApp({
            controllers: FileRoutes
        })
    }, 100 * 60 * 5)

    afterAll(() => {
        closeDataSource()
    })

    it('upload / download', async () => {
        const buffer = Buffer.from('some data');
        const token = await useSessionCreateToken(getUserAgent())
        // Upload
        let response = await getRequest()
            .post("/file/upload")
            .attach('file', buffer, 'custom_file_name.txt')
            .set('x-app-token', token);
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()

        // Download
        response = await getRequest()
            .get(`/file/download/${response.body.id}`)
            .set('x-app-token', token)
        expect(response.statusCode).toBe(200)
    })

    it('proxing download', async () => {
        const token = await useSessionCreateToken(getUserAgent())
        const file = await TFile.findOne({ where: { value: Not(IsNull()) } })
        // Download
        let response = await getRequest()
            .get(`/file/download/${file?.id}`)
            .set('x-app-token', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeNull()
        expect(response.body).not.toBeUndefined()
    })
});

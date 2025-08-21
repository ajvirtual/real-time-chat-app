import {  TUserOrganisation, useContextOrganisationActive } from "@chat/graphql"
import { Request, Response, query } from "express"
import { read, utils } from 'xlsx'
import { DataSource } from "typeorm"
import { useGetFile, useGlobalAppDataSource } from "@chat/context"
import { getColumnsMustHave } from "./utils/ColumnsMustHave"
import { useExcelGetSheetRows } from "./utils/excel/useExcelGetSheetRows"
import { useImportExcelUsers } from "./data/useImportExcelUsers"

export const importDataFromExcel = async (req: Request, res: Response) => {
    const { file, body } = req
    if (!file) {
        return res.status(401).json({ message: 'NO_FILE_UPLOADED' })
    }

    const queryRunner = (useGlobalAppDataSource() as DataSource).createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
        const workbook = read(file.buffer, { cellDates: true, type: "buffer" })
        const firstSheet = workbook.SheetNames[0]
        const sheetList = workbook.Sheets[firstSheet]

        const columnsMustHave = getColumnsMustHave()
        const fileColumns = utils.sheet_to_json(sheetList, { header: 1 })[0] as Array<string>

        const haveAllColumns = columnsMustHave.every((column) => fileColumns.includes(column))
        if (!haveAllColumns) {
            return res.status(401).json({ message: 'BAD_CONTENT' })
        }

        const dataRows = utils.sheet_to_json(sheetList).slice(0, 2)

        await queryRunner.commitTransaction()
        return res.status(204).send()

    } catch (e) {
        console.log(e)
        await queryRunner.rollbackTransaction()
        return res.status(500).json({ message: "INTERNAL_ERROR" })
    } finally {
        await queryRunner.release()
    }
}

export const importData = async (req: Request, res: Response) => {
    const { fileId, id } = req.body
    if (!fileId) {
        return res.status(400).send()
    }

    console.log(`[Import] file initializing`)
    const buffer = await useGetFile(fileId)
    console.log(`[Import] file initialized`)
    console.log(`[Import] reading file's user tab`)
    const users = useExcelGetSheetRows(buffer, 'Collaborateurs')
    const organisation = await TUserOrganisation.findOne({
        where: { id }
    })

    if (!organisation) {
        return res.status(404).send()
    }

    if (!organisation.canImport()) {
        return res.status(403).send()
    }

    const group = await organisation.groups

    console.log(`[Import] Query runner initializeing`)
    const queryRunner = (useGlobalAppDataSource() as DataSource).createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
        // users
        console.log(`[Import] import user`)
        await useImportExcelUsers(users, organisation.id, group[0].id)

        console.log(`[Import] commit transaction`)
        await queryRunner.commitTransaction()
        return res.status(204).send()
    } catch (e) {
        console.log(e)
        console.log(`[Import] error. Rollback`)
        await queryRunner.rollbackTransaction()
        return res.status(500).json({ message: "INTERNAL_ERROR" })
    } finally {
        await queryRunner.release()
    }
}
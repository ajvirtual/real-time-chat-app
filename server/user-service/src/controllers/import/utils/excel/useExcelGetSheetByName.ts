import { useExcelGetWorkbook } from "./useExcelGetWorkbook"

export const useExcelGetSheetByName = (buffer: Buffer, name: string) => {
    const workbook = useExcelGetWorkbook(buffer)
    const sheet = workbook.SheetNames.find((item) => item === name)
    if (!sheet) {
        throw `SHEET_NOT_FOUND: ${name}`
    }
    return workbook.Sheets[sheet]
}

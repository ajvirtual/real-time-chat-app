import { utils } from "xlsx"
import { useExcelGetSheetByName } from "./useExcelGetSheetByName"

export const useExcelGetSheetRows = (buffer: Buffer, name: string) => {
    const sheet = useExcelGetSheetByName(buffer, name)
    return utils.sheet_to_json(sheet)
}

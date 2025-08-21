import { read } from "xlsx"

export const useExcelGetWorkbook = (buffer: Buffer) => {
    return read(buffer, {cellDates: true, type: "buffer"})  
}

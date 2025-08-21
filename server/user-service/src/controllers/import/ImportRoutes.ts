import { Router } from 'express'
import multer from 'multer'
import { importData, importDataFromExcel } from './ImportController'

const storage = multer.memoryStorage()
const upload_memory = multer({ storage: storage })

const router: Router = Router()

router.post('/user/import', upload_memory.single("file"), importDataFromExcel)
router.post('/user/organisation/import', importData)

export default router
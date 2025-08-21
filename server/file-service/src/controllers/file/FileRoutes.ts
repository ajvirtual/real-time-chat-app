import { Router } from 'express'
import { download, upload } from './FileController'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload_memory = multer({ storage: storage })

const router: Router = Router()

router.get('/file/download/:id', download)
router.post('/file/upload', upload_memory.single("file"), upload)

export default router
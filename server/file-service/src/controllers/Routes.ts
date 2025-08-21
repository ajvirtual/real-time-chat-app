import { Router } from "express"
import FileRoutes from './file/FileRoutes'

const router: Router = Router()

router.use(FileRoutes)

export default router
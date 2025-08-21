import { Router } from "express"
import SessionRoutes from './session/SessionRoutes'
import UserRoutes from './user/UserRoutes'
import ImportRoutes from './import/ImportRoutes'

const router: Router = Router()

router.use(SessionRoutes)
router.use(UserRoutes)
router.use(ImportRoutes)

export default router
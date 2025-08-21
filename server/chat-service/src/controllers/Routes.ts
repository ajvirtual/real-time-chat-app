import { Router } from "express"
import ChatRoutes from './chat/ChatRoutes'

const router: Router = Router()

router.use(ChatRoutes)

export default router
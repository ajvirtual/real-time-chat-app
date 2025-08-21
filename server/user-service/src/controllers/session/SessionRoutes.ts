import { Router } from 'express'
import { login, logout, logoutDevice, runtimeEnv, runtimeUserRoles, token } from './SessionController'

const router: Router = Router()

router.get('/session/token', token)
router.get('/session/env', runtimeEnv)
router.get('/session/env/roles', runtimeUserRoles)
router.post('/session/login', login)
router.get('/session/logout', logout)
router.post('/session/logout/device', logoutDevice)

export default router
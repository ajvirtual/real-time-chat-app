import { Router } from 'express'
import { forgotPassword, forgotPasswordCode, forgotPasswordReset, resetPassword, singup, singupConfirmed, updatePassword, oauthGoogleLogin, oauthFacebookLogin, getProfilePicture } from './UserController'

const router: Router = Router()

router.post('/user/forgot-password', forgotPassword)
router.post('/user/forgot-password/code', forgotPasswordCode)
router.post('/user/forgot-password/password', forgotPasswordReset)
router.post('/user/signup', singup)
router.get('/user/signup/token/:token', singupConfirmed)
router.put('/user/password', updatePassword)
router.put('/user/password/reset', resetPassword)
router.post('/user/login/oauth2/google', oauthGoogleLogin)
router.post('/user/login/oauth2/facebook', oauthFacebookLogin)
router.get('/user/image/profile/:id', getProfilePicture)

export default router
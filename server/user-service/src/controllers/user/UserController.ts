// import { Request, Response } from 'express'
// import { useUserFind } from "controllers/session/hooks/user";
// import { v4 as uuid } from 'uuid';
// import moment from 'moment'
// import { TFile, TUser, useContext, useContextSession, useContextUser, useContextUserGroupRolesInclude } from '@chat/graphql';
// import { ENV, sendEmail, useFileUrl, useSessionLoginUserDevice } from '@chat/context';
// import { checkGoogleOAuthToken, getGoogleUserInfo } from './utils/GoogleOAuth';
// import { AuthCode, useUserAuth } from 'controllers/session/hooks/user/useUserAuth';
// import { verifyFacebookToken } from './utils/FacebookOAuth';
// // @ts-ignore
// import UIAvatarSvg from 'ui-avatar-svg'
// import { tailwindcss } from '@chat/config'
// import stream from 'stream'
// import bcrypt from 'bcrypt';
// import { uploadProfilePicture } from './utils/FileUpload';
// import { useActivateDefaultOrganisation } from 'hooks/useActivateDefaultOrganisation';

// export const forgotPassword = async (req: Request, res: Response) => {

//     const { email } = req.body

//     if (!email) {
//         return res.status(400).send()
//     }

//     const user = await useUserFind(email)

//     if (!user) {
//         return res.status(404).send()
//     }

//     user.resetPasswordCode = `${Math.floor(100000 + Math.random() * 900000)}`
//     user.dateResetPasswordCreated = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
//     await user.save()

//     const [SUBJECT] = await useBackendTranslations([
//         'Harea.Email.ForgotPassword.Object.Label'
//     ])

//     try {
//         await sendEmail({
//             to: user.email
//         }, {
//             subject: SUBJECT,
//             template: 'forgotPassword',
//             variables: {
//                 resetPasswordCode: user.resetPasswordCode
//             }
//         })
//         res.status(204).send()
//     } catch (e) {
//         console.log('error', e)
//         res.status(500).send({ message: 'EMAIL_NOT_SENT' })
//     }
// }

// export const forgotPasswordCode = async (req: Request, res: Response) => {

//     const { email, code } = req.body

//     if (!email || !code) {
//         return res.status(400).send()
//     }

//     const user = await useUserFind(email)
//     if (!user) {
//         return res.status(404).send()
//     }

//     if (user.resetPasswordCode !== code) {
//         return res.status(401).json({ message: 'CODE_INCORECT' })
//     }

//     if (moment(user.dateResetPasswordCreated).add(20, 'minutes').isBefore(moment())) {
//         return res.status(401).json({ message: 'CODE_EXPIRED' })
//     }

//     user.resetPasswordToken = uuid()
//     user.dateResetPasswordCreated = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
//     await user.save()

//     res.status(200).json({ token: user.resetPasswordToken })
// }

// export const forgotPasswordReset = async (req: Request, res: Response) => {

//     const { email, token, password, confirmationPassword } = req.body

//     if (!email || !token || !password) {
//         return res.status(400).send()
//     }

//     const user = await useUserFind(email)
//     if (!user) {
//         return res.status(404).send()
//     }

//     if (user.resetPasswordToken !== token) {
//         return res.status(401).json({ message: 'TOKEN_INCORECT' })
//     }
//     if (moment(user.dateResetPasswordCreated).add(20, 'minutes').isBefore(moment())) {
//         return res.status(401).send({ message: 'TOKEN_EXPIRED' })
//     }

//     if (password !== confirmationPassword) {
//         return res.status(401).send({ message: 'PASSWORD_NOT_MATCHED' })
//     }

//     user.password = await bcrypt.hash(password, 12)
//     user.resetPasswordCode = ''
//     user.resetPasswordToken = ''
//     await user.save()

//     const session = await useContextSession()
//     await useSessionLoginUserDevice(session, user)

//     res.status(204).send()
// }

// export const singup = async (req: Request, res: Response) => {

//     const { email, password, confirmationPassword } = req.body

//     if (!email || !password || !confirmationPassword) {
//         return res.status(400).send()
//     }

//     if (password !== confirmationPassword) {
//         return res.status(401).send({ message: 'PASSWORD_NOT_CORRESPOND' })
//     }

//     const user = await useUserFind(email)
//     if (user && user.dateInscriptionConfirmed) {
//         return res.status(403).send()
//     }

//     let _user = TUser.create({
//         email,
//         emailTolower: email.toLowerCase(),
//         userName: email.split('@')[0],
//         userNameTolower: email.split('@')[0]?.toLowerCase?.(),
//         password: await bcrypt.hash(password, 12),
//         inscriptionToken: uuid()
//     })

//     if (user && !user.dateInscriptionConfirmed) {
//         _user = user
//     }
//     const [SUBJECT] = await useBackendTranslations([
//         'Harea.Email.Signup.Object.Label'
//     ])
//     _user.inscriptionToken = uuid()
//     _user.dateInscriptionToken = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
//     const link = `${ENV.SERVER_APP_URL}fr/auth/signup?token=${_user.inscriptionToken}`

//     const currentUser = await useContextUser()
//     const canCreateUser = await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')
//     if (currentUser && canCreateUser) {
//         _user.userCreator = currentUser
//         _user.dateInscriptionConfirmed = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
//         _user.inscriptionToken = null
//         _user.dateInscriptionToken = null
//         _user.profilePublic = false
//         await _user.save()
//         return res.status(201).json({ id: _user.id })
//     }

//     await _user.save()

//     try {
//         await sendEmail({
//             to: _user.email
//         }, {
//             subject: SUBJECT,
//             template: 'signup',
//             variables: {
//                 link
//             }
//         })
//         res.status(204).send()
//     } catch (e) {
//         console.log('error', e)
//         res.status(500).send({ message: 'EMAIL_NOT_SENT' })
//     }
// }

// export const singupConfirmed = async (req: Request, res: Response) => {

//     const { token } = req.params

//     if (!token) {
//         return res.status(400).send()
//     }

//     const user = await TUser.findOne({ where: { inscriptionToken: token } })

//     if (!user) {
//         return res.status(404).send()
//     }

//     if (moment(user.dateInscriptionToken).add(20, 'minutes').isBefore(moment())) {
//         return res.status(401).json({ message: 'INSCRIPTION_TOKEN_EXPIRED' })
//     }

//     user.dateInscriptionConfirmed = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
//     user.inscriptionToken = null
//     user.dateInscriptionToken = null
//     await user.save()

//     const session = await useContextSession()
//     await useSessionLoginUserDevice(session, user, true)

//     res.status(200).json({ id: user.id })
// }

// export const resetPassword = async (req: Request, res: Response) => {

//     const { id, password } = req.body

//     if (!id || !password) {
//         return res.status(400).send()
//     }

//     const user = await TUser.findOne({ where: { id } })

//     if (!user) {
//         return res.status(404).send()
//     }

//     if (!(await user.canResetPassword())) {
//         return res.status(403).send()
//     }

//     const _newPassword = await bcrypt.hash(password, 12)
//     if (user.password === _newPassword) {
//         return res.status(401).send({ message: 'NEW_PASSWORD_MUST_BE_DIFFERENT' })
//     }

//     user.password = _newPassword
//     await user.save()
//     res.status(204).send()
// }

// export const updatePassword = async (req: Request, res: Response) => {

//     const { oldPassword, newPassword, confirmationPassword } = req.body

//     if (!oldPassword || !newPassword || !confirmationPassword) {
//         return res.status(400).send()
//     }

//     if (newPassword !== confirmationPassword) {
//         return res.status(401).send({ message: 'PASSWORD_NOT_CORRESPOND' })
//     }

//     const user = await useContextUser()
//     const _oldPassword = await bcrypt.hash(oldPassword, 12)
//     if (user.password !== _oldPassword) {
//         return res.status(401).send({ message: 'WRONG_PASSWORD' })
//     }

//     const _newPassword = await bcrypt.hash(newPassword, 12)
//     if (user.password === _newPassword) {
//         return res.status(401).send({ message: 'NEW_PASSWORD_MUST_BE_DIFFERENT' })
//     }

//     user.password = await bcrypt.hash(newPassword, 12)
//     await user.save()
//     res.status(204).send()
// }

// export const oauthGoogleLogin = async (req: Request, res: Response) => {
//     const { access_token } = req.body

//     if (!access_token) {
//         return res.status(404).send()
//     }

//     const checkTokenResponse = await checkGoogleOAuthToken(access_token)
//     if (checkTokenResponse.status !== 200) {
//         return res.status(403).json({ message: 'WRONG_ACCESS_TOKEN' })
//     }

//     const oauthUserInfo = await getGoogleUserInfo(access_token)
//     let user = await useUserFind(oauthUserInfo?.email)
//     const email = oauthUserInfo?.email
//     const profilePictureId = await uploadProfilePicture(oauthUserInfo?.picture);
    
//     if(!user){
//         const password = Math.random().toString(36).substring(2)
//         user = TUser.create({
//             email,
//             emailTolower: email.toLowerCase(),
//             userName: email.split('@')[0],
//             userNameTolower: email.split('@')[0]?.toLowerCase?.(),
//             firstName: oauthUserInfo?.given_name,
//             lastName: oauthUserInfo?.family_name,
//             password: await bcrypt.hash(password, 12),
//             dateInscriptionConfirmed: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
//             profilePicture: await TFile.findOne({where: {id: profilePictureId}})
//         })

//         user = await user.save()
//     }

//     const session = await useContextSession()
//     const sessionUser = await useSessionLoginUserDevice(session, user, true)
//     const context = await useContext()
//     if (context.appName === 'bo' || !user.profilePublic) {
//         await useActivateDefaultOrganisation(sessionUser)
//     }

//     return res.status(201).send()
// }

// export const oauthFacebookLogin = async (req: Request, res: Response) => {
//     const { idToken } = req.body
//     if (!idToken) {
//         return res.status(404).send()
//     }

//     const checkToken = await verifyFacebookToken(idToken)
//     if (checkToken.status !== 200) {
//         return res.status(403).json({ message: 'WRONG_ACCESS_TOKEN' })
//     }

//     const oauthUserInfo = await checkToken.json()
//     const email = oauthUserInfo?.email
//     let user = await useUserFind(oauthUserInfo?.email)

//     const profilePictureId = await uploadProfilePicture(oauthUserInfo?.picture.data.url);

//     if(!user){
//         const password = Math.random().toString(36).substring(2)
//         user = TUser.create({
//             email,
//             fullName: oauthUserInfo?.name,
//             firstName: oauthUserInfo?.name?.split(' ')[0],
//             lastName: oauthUserInfo?.name?.split(' ')[1],
//             emailTolower: email.toLowerCase(),
//             userName: email.split('@')[0],
//             userNameTolower: email.split('@')[0]?.toLowerCase?.(),
//             password: await bcrypt.hash(password, 12),
//             dateInscriptionConfirmed: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
//             profilePicture: await TFile.findOne({where: {id: profilePictureId}})
//         })

//         user = await user.save()
//     }

//     const session = await useContextSession()
//     const sessionUser = await useSessionLoginUserDevice(session, user, true)
//     const context = await useContext()
//     if (context.appName === 'bo' || !user.profilePublic) {
//         await useActivateDefaultOrganisation(sessionUser)
//     }

//     return res.status(201).send()
// }

// export const getProfilePicture = async (req: Request, res: Response) => {
//     const { id } = req.params
//     if (!id) {
//         return res.status(404).send()
//     }

//     const user = await TUser.findOne({ where: { id: parseInt(id) } })

//     if (!user) {
//         return res.status(404).send()
//     }

//     if (!(await user.profilePicture)?.id) {
//         const colors = tailwindcss.theme.colors
//         const svg = (new UIAvatarSvg())
//                         .text(user.fullName.split(' ').slice(0, 2).map((item) => item.charAt(0).toUpperCase()).join(''))
//                         .size(300)
//                         .bgColor(colors.primary)
//                         .textColor(colors.white)
//                         .generate();
        
//         const buf = Buffer.from(svg, 'utf-8')
//         const rs = new stream.PassThrough();
//         rs.end(buf);
//         res.set('Content-Description', 'File Transfer');
//         res.set('Content-disposition', `inline; filename="${user.id}.svg"`);
//         res.set('Content-Type', 'image/svg+xml');
//         return rs.pipe(res);
//     }

//     return res.redirect(useFileUrl((await user.profilePicture).id))
// }

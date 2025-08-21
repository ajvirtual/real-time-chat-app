import { TAppContext, TSession, TSessionUser, TUserOrganisation, useContext, useContextOrganisationActive, useContextSession, useContextUser, useContextUserGroupRoles, useContextUserGroupRolesInclude } from "@chat/graphql";
import { Request, Response } from 'express'
import { AuthCode, useUserAuth } from "./hooks/user/useUserAuth";
import { useSessionCreateToken, useSessionLoginUserDevice, useSessionLogoutUserDevice } from "@chat/context";
import { MoreThan } from "typeorm";
import moment from "moment";
import { useActivateDefaultOrganisation } from "hooks/useActivateDefaultOrganisation";
import { useSessionNewDeviceNotification } from "hooks/useSessionNewDeviceNotification";

export const token = async (req: Request, res: Response<string>) => {
    const context: TAppContext = await useContext()
    if (context.sessionUser) {
        const session = await useContextSession()
        res.status(200).send(session.token)
        return;
    }
    const token = await useSessionCreateToken(context.userAgent!)
    res.status(200).send(token)
}


export const runtimeEnv = async (req: Request, res: Response) => {
    const { sessionUser } = await useContext()
    if (!sessionUser) {
        res.status(401).send()
        return;
    }

    const _sessionUser = await TSessionUser.findOne({ where: { id: sessionUser.id } })
    const user = await _sessionUser.user
    const session = await _sessionUser.session
    const organisation = await _sessionUser.organisation

    res.status(200).json({
        ...sessionUser,
        remember: Boolean(sessionUser.remember),
        authenticated: Boolean(sessionUser.authenticated),
        active: Boolean(sessionUser.active),
        session,
        user: {
            ...user,
            canManageUser: await user?.canManageUser(),
            profilePicture: await user?.profilePicture
        },
        organisation,
        __session__: undefined,
        __user__: undefined,
        __organisation__: undefined
    });
}

export const runtimeUserRoles = async (req: Request, res: Response) => {
    const { sessionUser } = await useContext()
    if (!sessionUser) {
        res.status(400).send()
        return;
    }

    const roles = await useContextUserGroupRoles()
    res.status(200).json(roles);
}

export const logout = async (req: Request, res: Response) => {
    const session = await useContextSession()
    await useSessionLogoutUserDevice(session.id)
    res.status(201).send()
}

export const logoutDevice = async (req: Request, res: Response) => {
    const { id } = req.body
    const session: TSession = await TSession.findOne({ where: { id } })
    if (!(await session.canDeconnect())) {
        res.status(400).json({ message: 'FORBIDDEN' })
        return;
    }
    await useSessionLogoutUserDevice(id)
    res.status(201).send()
}

export const login = async (req: Request, res: Response) => {

    const { userName, password, remember } = req.body

    if (!userName) {
        return res.status(400).json({ message: AuthCode.USER_NAME_EMPTY })
    }

    if (!password) {
        return res.status(400).json({ message: AuthCode.PASSWORD_EMPTY })
    }

    const { result, user } = await useUserAuth(userName, password)
    if (result !== AuthCode.OK) {
        return res.status(403).json({ message: result })
    }

    const session = await useContextSession()

    await useSessionNewDeviceNotification(user)
    const sessionUser = await useSessionLoginUserDevice(session, user, remember as any)
    const context = await useContext()
    if (context.appName === 'bo' || !user.profilePublic) {
        await useActivateDefaultOrganisation(sessionUser)
    }

    res.status(201).send()
}

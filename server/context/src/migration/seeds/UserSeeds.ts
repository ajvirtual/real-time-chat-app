import { faker } from "@faker-js/faker"
import { TUser, TUserGroup, TUserGroupInvitation, TUserOrganisation } from "@chat/graphql"
import _ from "lodash"


export const generateUser = async (_user?: Partial<TUser>, saveDirectly?: boolean) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const userName = email.split('@')[0]
    let user = {
        firstName,
        lastName,
        fullName: `${lastName} ${firstName}`,
        email: email,
        emailTolower: email.toLocaleLowerCase(),
        userName,
        userNameTolower: userName.toLocaleLowerCase(),
        password: faker.string.uuid(),
        dateInscriptionConfirmed: faker.date.past().toUTCString(),
        ..._user
    }
    if (saveDirectly) {
        return await TUser.create(user).save()
    }
    return user as TUser
}

export const generateUsers = async (orgId: number, number: number = 5, user?: Partial<TUser>) => {
    const organisation = await TUserOrganisation.findOne({ where: { id: orgId } })
    const groups = await organisation.groups
    const _users = await Promise.all(_.times(number).map((index) => generateUser(user)))
    const users = await TUser.insert(_users)
    await Promise.all(
        users.identifiers.map((item) => generateUserOrganisationInvitation(groups[0], item as TUser, 'ACTIVE'))
    )
    return users.identifiers as Array<TUser>
}


export const generateUserOrganisationInvitation = async (group: TUserGroup, user: TUser, status: TUserGroupInvitation['status']) => {
    return TUserGroupInvitation.create({
        user: { id: user.id },
        group,
        status,
    }).save()
}

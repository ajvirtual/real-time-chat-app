import { faker } from "@faker-js/faker"
import { TDescriptor, TTransaction, TUser, TUserGroup, TUserOrganisation } from "@chat/graphql"
import _ from "lodash"
import { generateUser, generateUserOrganisationInvitation } from "./UserSeeds"
import { In } from "typeorm"

export const generateOrganisation = async (org?: Partial<TUserOrganisation>, licenseTransaction?: TTransaction, groupRole?: Array<string>) => {

    
    const roles = groupRole ? await TDescriptor.find({
        where: {
            tp: 'ROLE',
            value: In(groupRole)
        }
    }) : null

    const group = await TUserGroup.create({
        designation: 'Administrators',
        color: '#f80707',
        roles
    }).save()

    const user: TUser = await generateUser({}, true)
    await generateUserOrganisationInvitation(group, user, 'ACTIVE')

    // Insert organisation
    const organisation = await TUserOrganisation.create({
        designation: faker.company.name(),
        email: faker.internet.email(),
        adress: faker.location.streetAddress(),
        nif: _.random(10000, 20000, true).toString(),
        stat: _.random(10000, 20000, true).toString(),
        rcs: _.random(10000, 20000, true).toString(),
        comment: faker.word.words(20),
        ...org,
        licenseTransaction,
        groups: [group],
        userCreator: user
    }).save()
    

    return {
        organisation,
        user
    }
}


import { TUser, TUserGroupInvitation } from "@chat/graphql"
import { getCountryCode } from "../utils/CountryCode"
import { generatePassword } from "../utils/RandomPassword"
import moment from "moment"
import { generate } from "randomstring"

export const useImportExcelUsers = async (users: Array<Record<string, any>>, organisationId: number, groupId: number) => {
    
    const {
        identifiers: _users,
    } = await TUser.insert(
        users.map((row) => {
            const fullName = `${row["Nom"]} ${row["Prénom"]}`
            const userName = fullName.toLowerCase().replace(" ", "_")

            const userNameUpdated = `${userName}-${generate(4)}`
            const email = `${userNameUpdated}@empty.com`

            return ({
                firstName: row["Nom"],
                lastName: row["Prénom"],
                fullName: fullName,
                userName: userNameUpdated,
                userNameTolower: userNameUpdated,
                email: email,
                emailTolower: email,
                gender: row["Genre "],
                birthPlace: row["Lieu de naissance"],
                dateBirth: row["Date de naissance"],
                address: row["Adresse"],
                nationality: getCountryCode(row["Nationalité"]),
                cin: row["CIN"],
                residencePermit: row["Carte de séjour"],
                identityPieceDate: row["Date de délivance CIN"],
                identityPiecePlace: row["Lieu de délivrance"],
                identityPieceValidityDate: row["Date de validité"],
                workAuthorization: row["Autorisation d'emploi"],
                situationMatrimonial: row["Situation matrimoniale"],
                declarationCNAPS: row["Déclaration d'Embauche CNAPS"],
                declarationSMIE: row["Déclaration d'embauche SMIE"],
                cnapsNumber: row['Numéro CNAPS'],
                kidsNumber: row["Nombre d'enfants"],
                password: generatePassword(),
                dateInscriptionConfirmed: moment().toISOString(),
                profilePublic: false,
            })
        })
    )

    await TUserGroupInvitation.insert(_users.map((user) => ({
        user: { id: user.id },
        organisation: {
            id: organisationId
        },
        group: { id: groupId },
        status: 'ACTIVE' as any,
    })))
    return _users
}

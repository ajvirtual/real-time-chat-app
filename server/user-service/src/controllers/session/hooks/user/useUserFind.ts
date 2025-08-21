import { TUser } from "@chat/graphql"


export const useUserFind = async (userName: string | number) => {
    let user = await TUser.findOne({ where: { id: userName as number } })
    if (!user) {
        user = await TUser.findOne({ where: { userNameTolower: (userName as string).toLowerCase() } })
    }

    if (!user) {
        user = await TUser.findOne({ where: { emailTolower: (userName as string).toLowerCase() } })
    }
    return user
}

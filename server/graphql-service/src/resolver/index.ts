
import { TFileResolver } from "./TFileResolver"
import { TSessionResolver } from "./TSessionResolver"
import { TSessionUserDateResolver } from "./TSessionUserDateResolver"
import { TSessionUserResolver } from "./TSessionUserResolver"
import { TUserResolver } from "./TUserResolver"
import { TUserGroupResolver } from "./TUserGroupResolver"
import { TUserOrganisationResolver } from "./TUserOrganisationResolver"

export const Resolvers = [
        TFileResolver,
        TSessionResolver,
        TSessionUserDateResolver,
        TSessionUserResolver,
        TUserResolver,
        TUserGroupResolver,
        TUserOrganisationResolver
]

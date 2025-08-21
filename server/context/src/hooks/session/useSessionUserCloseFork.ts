import { TSessionUserDate } from "@chat/graphql"
import moment from "moment"
import { IsNull } from "typeorm"

export const useSessionUserCloseFork = async (sessionUserId: number) => {
    const sessionUserDate = await TSessionUserDate.findOne({ where: { sessionUser: { id: sessionUserId }, dateEnd: IsNull() } })

    if (sessionUserDate) {
        sessionUserDate.dateEnd = moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
        await sessionUserDate.save()
    }
}

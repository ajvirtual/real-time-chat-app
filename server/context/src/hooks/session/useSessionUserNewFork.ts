import { TSessionUserDate } from "@chat/graphql"
import moment from "moment"

export const useSessionUserNewFork = async (sessionUserId: number) => {
    const sessionUserDate = TSessionUserDate.create({
        sessionUser: { id: sessionUserId },
        dateBegin: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
        dateEnd: null
    })
    await sessionUserDate.save()
}

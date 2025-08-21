import { useQuery } from "react-query"

export const BuggyQueryComponent = () => {

    const queryFn = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject({}), 750)
        })
    }
    useQuery('Buggy.Query.Component', queryFn, { suspense: true, retry: false })
}

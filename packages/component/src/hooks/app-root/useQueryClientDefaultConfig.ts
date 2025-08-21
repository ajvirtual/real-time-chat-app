import _ from "lodash"
import { QueryClientConfig } from "react-query"

/** 
 * @deprecated Please, do not use this hooks, it break the default behaviour of react-query
 */
export const useQueryClientDefaultConfig = (config?: QueryClientConfig): QueryClientConfig => {

    return _.extend<QueryClientConfig, QueryClientConfig>({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    }, config || {})
}

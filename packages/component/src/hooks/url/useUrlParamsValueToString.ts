import { useUrlParamsEncode } from "./useUrlParamsEncode";
import { useUrlParamsValue } from "./useUrlParamsValue";

export const useUrlParamsValueToString = () => {
    const value = useUrlParamsValue();
    const encode = useUrlParamsEncode()
    return encode(value)
}
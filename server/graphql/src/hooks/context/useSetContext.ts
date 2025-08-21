import { TAppContext } from "@_types/base";

export const useSetContext = (value: TAppContext) => {
    (global as any).context = value
}

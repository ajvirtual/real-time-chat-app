import { TAppContext } from "@_types/base";

export const useContext = (): TAppContext => {
    return (
        (global as any).context || ((global as any).context = {})
    );
}

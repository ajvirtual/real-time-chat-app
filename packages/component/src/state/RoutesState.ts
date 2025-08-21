import { AppRouteProps } from "containers";
import { atom } from "recoil";


export const RoutesState = atom<Array<AppRouteProps>>({
    key: 'state.Routes',
    default : undefined
});

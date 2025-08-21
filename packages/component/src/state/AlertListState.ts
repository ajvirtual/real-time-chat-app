

import { AlertProps } from "@components/alert";
import { atom } from "recoil";

export const AlertListState = atom<Array<AlertProps>>({
    key: 'Alert.List',
    default: [],
});
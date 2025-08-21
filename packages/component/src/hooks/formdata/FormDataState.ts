import { ReactNode } from "react";
import { atomFamily } from "recoil";

export const FormDataState = atomFamily<Record<string, any>, string>({
    key: 'state.FormDataState',
    default: {},
});

export const FormDataErrorState = atomFamily<FormDataErrorProps, string>({
    key: 'state.FormDataErrorState',
    default: {},
});

export const FormDataDirtyState = atomFamily<boolean, string>({
    key: 'state.FormDataDirtyState',
    default: false,
});

export type FormDataErrorProps = Record<string, string | ReactNode>

import { atom } from "recoil";

export const DocumentTitleState = atom<DocumentTitleProps>({
    key: 'state.Routes.DocumentTitle',
    default : {}
});

export type DocumentTitleProps = Record<string, string>
import { atom } from 'recoil'

export const SuspenseErrorState = atom<SuspenseError | undefined>({
    key: 'state.SuspenseError',
    default: undefined
})

export type SuspenseError = {
    title?: string
    code?: string
    message?: string
    transformError?: (
        error: Error,
        resetErrorBoundary: () => void
    ) => SuspenseError
}

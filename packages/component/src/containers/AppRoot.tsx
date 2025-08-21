import { useQueryClientDefaultConfig } from "@hooks/app-root/useQueryClientDefaultConfig"
import React, { useCallback, useMemo } from "react"
import { QueryClient, QueryClientConfig, QueryClientProvider } from "react-query"
import { MutableSnapshot, RecoilRoot, RecoilState } from "recoil"
import { BrowserRouter, HashRouter, MemoryRouter, MemoryRouterProps, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { AppShell, AppShellProps } from "./AppShell"
import { GenericSuspense } from "@components/suspense"
import { RoutesState } from "@state/RoutesState"
import { MemoryHistory } from "history"
import '../main.css'

const AppRoot = ({ queryClientConfig, children, suspenseFallback, routerType, initialEntries, initialState, history, ...props }: AppRootProps) => {

    const _queryClientConfig = useQueryClientDefaultConfig(queryClientConfig)
    const queryClient = useMemo(() => new QueryClient(_queryClientConfig), [_queryClientConfig])

    const wrapRouter = useCallback((children: React.ReactElement | React.ReactNode) => {

        if (routerType === 'history') {
            return <HistoryRouter history={history! as any}>{children}</HistoryRouter>
        }

        if (routerType === 'memory') {
            return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        }

        if (routerType === 'hash') {
            return <HashRouter>{children}</HashRouter>
        }

        return (
            <BrowserRouter>{children}</BrowserRouter>
        )
    }, [])

    const initializeState: (mutableSnapshot: MutableSnapshot) => void = ({ set }) => {
        initialState?.forEach((entry) => {
            set(entry.state, entry.value);
        });

        props.routes && set(RoutesState, props.routes)
    }
    return (
        <RecoilRoot initializeState={initializeState}>
            <QueryClientProvider client={queryClient}>
                {
                    wrapRouter(
                        <GenericSuspense fallback={suspenseFallback}>
                            {children || <AppShell {...props} routes={props.routes || []} />}
                        </GenericSuspense>
                    )
                }
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export type AppInitialState = {
    state: RecoilState<any>,
    value: any
}

export type AppRootProps = Omit<AppShellProps, 'routes'> & {
    initialState?: Array<AppInitialState>
    queryClientConfig?: QueryClientConfig
    children?: React.ReactElement | React.ReactNode
    suspenseFallback?: React.ReactElement
    routes?: AppShellProps['routes']
    routerType?: 'browser' | 'hash' | 'memory' | 'history'
    initialEntries?: MemoryRouterProps['initialEntries']
    history?: MemoryHistory
}

export default AppRoot

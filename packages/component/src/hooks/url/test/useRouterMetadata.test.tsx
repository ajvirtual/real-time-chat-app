import React from "react"
import { AppRouteProps } from "containers"
import { useRouterMetadata } from "../useRouterMetadata"
import { renderHook } from "@testing-library/react-hooks"

describe('[useRouterMetadata]', () => {
    it('return basic meta', () => {
        const { result } = renderHook(() => useRouterMetadata())
        const value = result.current?.(ROUTES, '/advert/15')
        expect(value).toEqual({
            title: 'Advert details',
            description: 'Advert details description',
        })
    })

    it('return deep nested meta', () => {
        const { result } = renderHook(() => useRouterMetadata())
        const value = result.current?.(ROUTES, '/advert/15/command')
        expect(value).toEqual({
            title: 'command',
            description: 'Advert details command description',
        })
    })
})

const ROUTES: Array<AppRouteProps> = [
    {
        path: '/',
        element: (<h1>Home</h1>)
    },
    {
        path: 'advert',
        element: <h1>Advert</h1>,
        children: [
            {
                path: ':id',
                title: 'Advert details',
                description: 'Advert details description',
                children: [
                    { path: 'description', title: 'description' },
                    { path: 'command', description: 'Advert details command description', title: 'command' }
                ]
            }
        ]
    }
]


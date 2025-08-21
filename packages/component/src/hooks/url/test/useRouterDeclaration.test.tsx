import React from "react"
import { AppRouteProps } from "containers"
import { renderHook } from "@testing-library/react-hooks"
import { useRouterDeclaration } from "../useRouterDeclaration"

describe('[useRouterDeclaration]', () => {

    it('return router declaration by url', () => {
        const { result } = renderHook(() => useRouterDeclaration())
        const value = result.current?.(ROUTES, '/advert/15')
        expect(value).toEqual({
            path: ':id',
            title: 'Advert details',
            children: [
                { path: 'description', title: 'description' },
                { path: 'command', title: 'command' }
            ]
        })
    })

    it('return deep router declaration', () => {
        const { result } = renderHook(() => useRouterDeclaration())
        const value = result.current?.(ROUTES, '/advert/15/description')
        expect(value).toEqual({ path: 'description', title: 'description' })
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
                children: [
                    { path: 'description', title: 'description' },
                    { path: 'command', title: 'command' }
                ]
            }
        ]
    }
]

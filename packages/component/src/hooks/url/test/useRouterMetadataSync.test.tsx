import React from "react"
import { mockAppInit } from "@test/utils"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { AppRoot, AppRouteProps } from "containers"
import { act } from "react-dom/test-utils"
import { Link, Outlet } from "react-router-dom"
import '@testing-library/jest-dom'

describe('[useRouterMetadataSync]', () => {

    it('navigate throw apps', async () => {
        mockAppInit()

        act(() => {
            render(
                <AppRoot routerType='browser' routes={ROUTES} initialPath="/en/advert" />
            )
        })


        await waitFor(async () => {
            expect(document.title).toBe('App')
        }, {
            timeout: 1000
        })

        await waitFor(async () => {
            const navigateAdvert = await screen.findByTestId('navigate-advert')
            fireEvent.click(navigateAdvert)
            expect(document.title).toBe('Advert - App')
        })

        await waitFor(async () => {
            const navigateAdvertCommand = await screen.findByTestId('navigate-advert-command')
            fireEvent.click(navigateAdvertCommand)
            expect(document.title).toBe('Command - Advert details - Advert - App')
        })

    })
})

const ROUTES: Array<AppRouteProps> = [
    {
        path: '/:lang',
        title: 'App',
        children: [
            {
                path: '',
                element: (
                    <>
                        <h1>Home</h1>
                        <Outlet />
                        <Link to="/en/advert/" data-testid="navigate-advert">Navigate</Link>
                    </>
                ),
                children: [
                    {
                        path: 'advert',
                        title: 'Advert',
                        element: (
                            <>
                                <h1>Advert</h1>
                                <Outlet />
                                <Link to="/en/advert/1/command" data-testid="navigate-advert-command">Navigate</Link>
                            </>
                        ),
                        children: [
                            {
                                path: ':id',
                                title: 'Advert details',
                                description: 'Advert details description',
                                children: [
                                    { path: 'description', title: 'description' },
                                    { path: 'command', description: 'Advert details command description', title: 'Command' }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    }
]

import { renderHook } from "@testing-library/react-hooks"
import { useAjaxToken } from "../useAjaxToken"
import '@testing-library/jest-dom'
import { act, waitFor } from "@testing-library/react"
import React from "react"
import AppRoot from "containers/AppRoot"
import { createMemoryHistory } from "history"
import { mockAjaxGet } from "@test/utils/MockAjax"

describe('[useAjaxToken]', () => {
    it('Remove token params and set it inside', async () => {
        const history = createMemoryHistory({
            initialEntries: [
                {
                    pathname: `/`,
                    search: '?params=1&_t=4694e879-ae6c-472b-b083-d1cf80e96b60'
                }
            ]
        });
        act(() => {
            renderHook(() => useAjaxToken(), {
                wrapper: ({ children }) => {
                    return (
                        <AppRoot routerType="history" history={history}>
                            {children}
                        </AppRoot>
                    )
                }
            })
        })
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
            expect(history.location.search).toBe('?params=1')
        })
    })


    it('fetch a token and set it if no token stored inside localstorage', async () => {
        localStorage.clear()
        const token = 'dfef562c-1ad3-4539-bc47-443f68300453'
        mockAjaxGet((path: string) => {
            if (path === 'session/token') {
                return token
            }
            return undefined
        })

        const history = createMemoryHistory({
            initialEntries: [
                {
                    pathname: `/`,
                    search: '?params=1'
                }
            ]
        });
        act(() => {
            renderHook(() => useAjaxToken(), {
                wrapper: ({ children }) => {
                    return (
                        <AppRoot routerType="history" history={history}>
                            {children}
                        </AppRoot>
                    )
                }
            })
        })
        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
            expect(history.location.search).toBe('?params=1')
            expect(localStorage.getItem('x-app-token')).toBe(token)
        })
    })

    it('do nothing token already exist', async () => {
        // @ts-ignore
        delete global.window.location
        global.window = Object.create(window);
        const mockReload = jest.fn()
        // @ts-ignore
        global.window.location = {
            ...window.location,
            reload: mockReload
        };
        localStorage.clear()
        const token = 'dfef562c-1ad3-4539-bc47-443f68300453'
        localStorage.setItem('x-app-token', token)

        const history = createMemoryHistory({
            initialEntries: [
                {
                    pathname: `/`,
                    search: '?params=1'
                }
            ]
        });

        act(() => {
            renderHook(() => useAjaxToken(), {
                wrapper: ({ children }) => {
                    return (
                        <AppRoot routerType="history" history={history}>
                            {children}
                        </AppRoot>
                    )
                }
            })
        })

        await waitFor(() => {
            expect(history.location.pathname).toBe('/')
            expect(history.location.search).toBe('?params=1')
            expect(localStorage.getItem('x-app-token')).toBe(token)
            expect(mockReload).not.toBeCalled()
        })
    })
})

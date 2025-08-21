import React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { AppRoot } from "containers"
import { mockAppInit } from "@test/utils"
import { Dialog } from "../Dialog"

describe('[Dialog]', () => {
    it('render', async () => {
        mockAppInit()
        const hello = 'Hello world'
        act(() => {
            render((
                <Dialog open={true}>
                    <h1>{hello}</h1>
                </Dialog>
            ), {
                wrapper: ({ children }) => {
                    return (
                        <AppRoot routerType="memory">
                            {children}
                        </AppRoot>
                    )
                }
            })
        })
        await waitFor(() => {
            expect(screen.getByText(hello)).toBeInTheDocument()
        })
    })

    it('dismiss', async () => {
        mockAppInit()
        const hello = 'Hello world'
        const handleClose = jest.fn()
        act(() => {
            render((
                <Dialog open={true} title="Modal" onDismiss={handleClose}>
                    <h1>{hello}</h1>
                </Dialog>
            ), {
                wrapper: ({ children }) => {
                    return (
                        <AppRoot routerType="memory">
                            {children}
                        </AppRoot>
                    )
                }
            })
        })
        await waitFor(() => {
            const button = screen.getByTestId('dialog-title-button-dismiss')
            fireEvent.click(button)
            expect(handleClose).toBeCalled()
        })
    })

})

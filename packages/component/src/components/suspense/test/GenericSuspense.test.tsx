import React from 'react'
import { act, fireEvent, waitFor, queryByText, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { GenericSuspense } from '../GenericSuspense'
import { BuggyComponent } from '../component/BuggyComponent'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BuggyQueryComponent } from '../component/BuggyQueryComponent'
import { createMemoryHistory } from 'history'
import { MemoryRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

const queryClient = new QueryClient()

const hideConsole = () => {
    const spy = jest.spyOn(console, 'error')
    spy.mockImplementation(() => { })
    return spy;
}

const showConsole = (spy: jest.SpyInstance) => {
    spy.mockRestore()
}

describe('[GenericSuspense]', () => {
    it('Render with error', () => {
        const text = 'Hello world!'
        const { container, getByTestId } = render(
            <MemoryRouter>
                <GenericSuspense>
                    <h1>{text}</h1>
                    <BuggyComponent />
                </GenericSuspense>
            </MemoryRouter>
        )
        // Render normaly
        expect(queryByText(container, text)).toBeInTheDocument()

        // Trigger an arror
        const spy = hideConsole()
        const button = getByTestId('buggy-component-btn')
        fireEvent.click(button)
        expect(queryByText(container, text)).not.toBeInTheDocument()
        showConsole(spy)

        // Retry
        const retryButton = getByTestId('generic-suspense-error-retry-btn');
        retryButton && fireEvent.click(retryButton)
        expect(queryByText(container, text)).toBeInTheDocument()
    })

    it('Render with error and custom error component', () => {
        const text = 'An error happened'
        const { getByTestId, getByText } = render(
            <MemoryRouter>
                <GenericSuspense fallbackError={() => <h1>{text}</h1>}>
                    <BuggyComponent />
                </GenericSuspense>
            </MemoryRouter>
        )

        // Trigger an arror
        const spy = hideConsole()
        act(() => {
            const button = getByTestId('buggy-component-btn')
            fireEvent.click(button)
        })
        expect(getByText(text)).toBeInTheDocument()
        showConsole(spy)
    })


    it('Render with error react-query', async () => {
        const text = 'An error happened'
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <GenericSuspense fallbackError={() => <h1>{text}</h1>}>
                        { /** @ts-ignore */}
                        <BuggyQueryComponent />
                    </GenericSuspense>
                </MemoryRouter>
            </QueryClientProvider>
        )

        const spy = hideConsole()
        const elementText = await waitFor(() => getByText(text))
        expect(elementText).toBeInTheDocument()
        showConsole(spy)
    })

    it('Reset when route change', async () => {
        const text = 'Hello world!'
        const textContact = 'Contact'
        const history = createMemoryHistory({ initialEntries: ['/home'] });
        history.replace = jest.fn();
        act(() => {
            render(
                (
                    <HistoryRouter history={history as any}>

                        <GenericSuspense>
                            <Routes>
                                <Route path='/home' element={(
                                    <>
                                        <h1>{text}</h1>
                                        <BuggyComponent />
                                    </>
                                )} />
                                <Route path='/contact' element={(
                                    <h1>{textContact}</h1>
                                )} />
                            </Routes>
                        </GenericSuspense>

                    </HistoryRouter>
                )
            )
        })

        const spy = hideConsole()
        await waitFor(async () => {
            const button = await screen.findByTestId('buggy-component-btn')
            fireEvent.click(button)
        })
        showConsole(spy)

        
        const errorMessage = await screen.findByTestId('generic-suspense-message')
        expect(errorMessage).toBeInTheDocument()

        act(() => {
            history.push('/contact')
        })
        
        expect(errorMessage).not.toBeInTheDocument()
        expect(await screen.findByText(textContact)).toBeInTheDocument()
    })
})



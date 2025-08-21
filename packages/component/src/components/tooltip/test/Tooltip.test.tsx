import React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Tooltip } from "../Tooltip"

describe('[Tooltip]', () => {
    it('trigger on click', async () => {
        const text = 'Hello world!'
        act(() => {
            render((
                <Tooltip text={text} closeTimeout={0}>
                    <button data-testid="btn">Click me</button>
                </Tooltip>
            ))
        })

        fireEvent.click(await screen.getByTestId('btn'))
        const el = await screen.getByText(text)
        expect(el).toBeInTheDocument()
        await waitFor(() => {
            fireEvent.click(document.body)
            expect(el).not.toBeInTheDocument()
        })

    })

    it('trigger on hover', async () => {
        const text = 'Hello world!'
        act(() => {
            render((
                <Tooltip text={text} trigger="hover" closeTimeout={0}>
                    <button data-testid="btn">Click me</button>
                </Tooltip>
            ))
        })

        fireEvent.mouseEnter(await screen.getByTestId('btn'))
        const el = await screen.getByText(text)
        expect(el).toBeInTheDocument()
        fireEvent.mouseLeave(await screen.getByTestId('btn'))
        expect(el).not.toBeInTheDocument()

    })
})


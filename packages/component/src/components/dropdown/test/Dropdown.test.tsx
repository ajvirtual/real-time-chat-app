import React from "react"
import { render, screen } from "@testing-library/react"
import { Dropdown } from "../Dropdown"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('[Dropdown]', () => {
    it('render', () => {
        render(<Dropdown />)
    })

    it('poper not visible', async () => {
        const dropdownId = 'dropdown'
        render(
            <Dropdown>
                <div data-testid={dropdownId}>
                    This is a dropdown
                </div>
            </Dropdown>
        )

        expect(screen.queryByTestId(dropdownId)).not.toBeInTheDocument()
    })

    it('popper visible', async () => {
        const dropdownId = 'dropdown'
        const div = document.createElement('div')
        document.documentElement.append(div)
        render(
            <Dropdown anchorEl={div}>
                <div data-testid={dropdownId}>
                    This is a dropdown
                </div>
            </Dropdown>
        )
        expect(screen.queryByTestId(dropdownId)).toBeInTheDocument()
    })

    // it('trigger close event on clickaway', () => {
    //     const dropdownId = 'dropdown'
    //     const div = document.createElement('div')
    //     document.documentElement.append(div)
    //     const handleClose = jest.fn()
    //     render(
    //         <Dropdown anchorEl={div} onClose={handleClose}>
    //             <div data-testid={dropdownId}>
    //                 This is a dropdown
    //             </div>
    //         </Dropdown>
    //     )
    //     expect(screen.queryByTestId(dropdownId)).toBeInTheDocument()
    //     userEvent.click(document.body);
    //     expect(handleClose).toBeCalled()

    // })
})

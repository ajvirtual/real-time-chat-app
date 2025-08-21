import React from "react"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { ButtonSubmit } from "../ButtonSubmit"

describe('[ButtonSubmit] Render button', () => {
    it('render', () => {
        const label = 'Click here'
        const { getByText } = render(<ButtonSubmit label={label} />)
        expect(getByText(label)).toBeInTheDocument()
    })

    it('render with icon', () => {
        const label = 'Click here'
        const icon = 'fa-plus'
        const { container, getByText } = render(<ButtonSubmit label={label} startIcon={icon} />)
        expect(getByText(label)).toBeInTheDocument()
        expect(container.getElementsByClassName(icon)[0]).toBeInTheDocument()
    })

    it('render with icon and submit', () => {
        const label = 'Click here'
        const icon = 'fa-plus'
        const { container, getByText } = render(<ButtonSubmit label={label} startIcon={icon} isSubmit />)
        expect(getByText(label)).toBeInTheDocument()
        expect(container.getElementsByClassName('fa-pulse')[0]).toBeInTheDocument()
    })
})

import React from "react"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Button } from "../Button"

describe('[Button] Render button', () => {
    it('render', () => {
        const label = 'Click here'
        const { getByText } = render(<Button label={label} />)
        expect(getByText(label)).toBeInTheDocument()
    })

    it('render with icon', () => {
        const label = 'Click here'
        const icon = 'fa-plus'
        const { container, getByText } = render(<Button label={label} startIcon={icon} />)
        expect(getByText(label)).toBeInTheDocument()
        expect(container.getElementsByClassName(icon)[0]).toBeInTheDocument()
    })
})

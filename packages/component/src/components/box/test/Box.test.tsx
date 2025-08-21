import React from "react"
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Box } from "../Box"

describe('[Box]', () => {
    it('render', () => {
        render(<Box></Box>)
    })

    it('render with title, icon and children', () => {
        const title = 'This is a title'
        const icon = 'fa fa-plus'
        const text = 'Hello world!'
        const { getByText, getByTestId } = render(
            <Box title={title} icon={icon}>
                <h1>{text}</h1>
            </Box>
        )
        expect(getByText(title)).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
        expect(getByTestId('box-icon')).toBeInTheDocument()
    })
})

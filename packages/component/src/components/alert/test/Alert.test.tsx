import React from "react"
import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Alert } from "../Alert"

describe('[Alert]', () => {
    it('render', () => {
        render(<Alert />)
    })

    test.todo('render with icon')
})

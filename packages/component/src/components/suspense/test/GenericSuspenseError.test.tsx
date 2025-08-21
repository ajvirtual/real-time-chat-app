import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { GenericSuspenseError } from '../GenericSuspenseError'

test('[GenericSuspenseError] Render', () => {
    render(<GenericSuspenseError />)
})

test('[GenericSuspenseError] Render specific message', () => {
    const errorMessage = 'Error happened'
    const retryButton = 'Retry'
    const { getByText} = render(<GenericSuspenseError message={errorMessage} retry={retryButton} />)
    expect(getByText(errorMessage)).toBeInTheDocument()
    expect(getByText(retryButton)).toBeInTheDocument()
})

test('[GenericSuspenseError] Render retry click', () => {
    const handleRetryClick = jest.fn();
    const { getByTestId } = render(<GenericSuspenseError onRetryClick={handleRetryClick} />)
    const retryButton = getByTestId('generic-suspense-error-retry-btn');
    fireEvent.click(retryButton)
    expect(handleRetryClick).toBeCalled()

})

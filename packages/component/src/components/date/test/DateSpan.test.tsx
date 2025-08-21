import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import { DateSpan } from '../DateSpan'
import moment from 'moment'

describe('[DateSpan]', () => {
    it('render', () => {
        const date = moment().subtract(1, 'minutes').toDate()
        render(<DateSpan value={date} />)
        expect(screen.getByText('a minute ago')).toBeInTheDocument()
    })

    it('update on an interval', () => {
        const date = moment().subtract(2, 'seconds').toDate()
        render(<DateSpan value={date} interval={1000} />)
        waitFor(() => {
            expect(screen.getByText('3 minutes ago')).toBeInTheDocument()
        }, {
            timeout: 1100
        })
    })

    
})
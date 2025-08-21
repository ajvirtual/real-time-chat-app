import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Timer } from '../Timer'
import moment from 'moment'

describe('[Timer]', () => {
    it('render disabled', () => {

        const value = '5'
        const dateValue = moment().add(value, 'minutes').format('x')
        render(<Timer value={dateValue} disabled />)
        expect(screen.getByTestId('timer-value').innerHTML).toBe('5:00')
    })

    it('render decimal disabled', () => {

        const value = '0.5'
        const dateValue = moment().add(value, 'minutes').format('x')
        render(<Timer value={dateValue} disabled />)
        expect(screen.getByTestId('timer-value').innerHTML).toBe('0:30')
    })    
})
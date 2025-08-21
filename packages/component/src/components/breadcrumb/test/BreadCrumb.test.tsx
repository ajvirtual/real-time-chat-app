import React from 'react'
import {render, screen} from '@testing-library/react'
import { BreadCrumb, BreadCrumbItemProps } from '../BreadCrumb'
import '@testing-library/jest-dom'

describe('[BreadCrumb]', () => {
    it('render', () => {

        const items: Array<BreadCrumbItemProps> = [
            {
                label: 'Home',
                link: ''
            },
            {
                label: 'Translations'
            }
        ]

        render(<BreadCrumb items={items} />)
        expect(screen.queryByText('Home')).toBeInTheDocument()
        expect(screen.queryByText('Translations')).toBeInTheDocument()
    })

    test.todo('has sub categories')
})

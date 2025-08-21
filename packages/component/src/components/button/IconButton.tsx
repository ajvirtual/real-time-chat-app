import React, { ReactElement } from 'react'
import { ButtonProps } from './Button'

export const IconButton = ({
    className,
    icon,
    children,
    ...props
}: IconButtonProps) => (
    <button type='button' className={`btn-icon p-2 ${className}`} {...props}>
        {children}
        {typeof icon === 'string' ? (
            <i className={`fa-solid ${icon}`}></i>
        ) : (
            icon
        )}
    </button>
)

export type IconButtonProps = Omit<
    ButtonProps,
    'startIcon' | 'endIcon' | 'label'
> & {
    icon?: string | ReactElement
}

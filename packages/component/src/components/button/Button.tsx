import React, { ButtonHTMLAttributes, ReactElement } from 'react'
import './css/style.css'

export const Button = ({
    className,
    startIcon,
    endIcon,
    label,
    children,
    ...props
}: ButtonProps) => (
    <button type='button' className={`btn ${className}`} {...props}>
        {typeof startIcon === 'string' ? (
            <i className={`fa start-icon ${startIcon}`}></i>
        ) : (
            startIcon
        )}
        {label && <span>{label}</span>}
        { children && <span>{children}</span> }
        {typeof endIcon === 'string' ? (
            <i className={`fa end-icon ${endIcon}`}></i>
        ) : (
            endIcon
        )}
    </button>
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Label of the button */
    label?: string
    /** Icon of the button */
    startIcon?: string | ReactElement
    endIcon?: string | ReactElement
    [key: string]: any
}

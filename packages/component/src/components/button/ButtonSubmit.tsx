import React from 'react'
import { Button, ButtonProps } from './Button'

export const ButtonSubmit = ({ isSubmit, ...props }: ButtonSubmitProps) => {

    return (
        <Button
            type="submit"
            {...props}
            startIcon={props.startIcon && `${(isSubmit) ? 'fa-spinner fa-w fa-pulse' : props.startIcon || "fa-save"}`}
            endIcon={props.endIcon && `${(isSubmit) ? 'fa-spinner fa-w fa-pulse' : props.endIcon || "fa-save"}`}
            disabled={props.disabled || isSubmit}
        />
    )
}

export type ButtonSubmitProps = ButtonProps & {
    isSubmit?: boolean,
    disableTillDiffAfterSuccess?: boolean,
    successEndIcon?: string,
}
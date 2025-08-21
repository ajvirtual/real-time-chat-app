import { IconButton, IconButtonProps } from './IconButton'

export const IconButtonSubmit = ({
    isSubmit,
    ...props
}: IconButtonProps) => (
    <IconButton 
        {...props}
        icon={props.icon && `${(isSubmit) ? 'fa-spinner fa-w fa-pulse' : props.icon || "fa-save"}`}
        disabled={props.disabled || isSubmit}
        />
)

export type IconButtonSubmitProps = IconButtonProps & {
    isSubmit?: boolean
}

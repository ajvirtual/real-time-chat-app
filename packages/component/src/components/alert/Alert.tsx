
import { Button, ButtonProps } from '@components/button/Button'
import { IconButton } from '@components/button/IconButton'
import React, { HTMLAttributes, useEffect } from 'react'
import './css/alert.css'

export const Alert = ({ isDismissible, onDispose, onClose, dismissTimeout, action, ...props }: AlertProps) => {

    useEffect(() => {
        if (dismissTimeout) {
            setTimeout(() => {
                if (onClose) {
                    onClose?.()
                    return
                }
                onDispose?.()
            }, dismissTimeout)
        }

    }, [dismissTimeout])

    return (
        <div {...props} className={`alert alert-${props.type} ${props.className}`}>
            <div className='alert-icon'>
                {
                    typeof props.icon === 'string'
                        ? <i className={props.icon}></i>
                        : props.icon
                }
            </div>
            <div className='alert-text'>
                {
                    props.text &&
                    <span>{props.text}</span>
                }
                {props.children}
            </div>

            <div className='alert-button'>
                {
                    action &&
                    <Button {...action} />
                }

                {
                    isDismissible &&
                    <IconButton className="close" onClick={onClose || onDispose} icon="fa-solid fa-times" />
                }
            </div>
        </div>
    )
}


export type AlertProps = HTMLAttributes<HTMLDivElement> & {
    /** Alert allow you to show you boostrap alert. */
    text?: string,
    icon?: string | React.ReactElement
    /** Type of the alert */
    type?: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default',
    action?: ButtonProps
    dismissTimeout?: number
    isDismissible?: boolean
    onClose?: () => void
    /**
     * @deprecated use "onClose" event instead
     */
    onDispose?: () => void
}

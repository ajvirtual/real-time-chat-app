import { IconButton } from '@components/button/IconButton'
import React, { ReactElement } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Avatar } from '@components/avatar/Avatar'
import { useFileUrl } from '@hooks/assets/useFileUrl'
import fontColorContrast from 'font-color-contrast'
import { useUserProfilePicture } from '@hooks/assets'

export const Chip = ({ startIcon, endIcon, ...props }: ChipPops) => {

    const fileUrl = useFileUrl()
    const userProfilePictureUrl = useUserProfilePicture()

    return (
        <div
            {...props}
            className={`control-chip ${props.className} ${props.dismissible && 'dismissible'
                }`}
            style={{ ...props.style, backgroundColor: props.color, color: props.color ? fontColorContrast(props.color) : undefined }}
        >
            <span className='control-chip-start-icon'>
                {typeof startIcon === 'string' ? (
                    <i className={`fa-solid start-icon ${startIcon}`}></i>
                ) : (
                    startIcon
                )}

                {props.showFileId && (
                    <Avatar src={props.fileId && fileUrl(props.fileId)} fullName={props.label as string} size="xs" />
                )}

                {(props.userId) && (
                    <Avatar src={userProfilePictureUrl(props.userId)} size="xs" />
                )}
            </span>
            {!props.url ? (
                <span>{props.label}</span>
            ) : (
                <a href={props.url}>{props.label}</a>
            )}

            {
                endIcon &&
                <span className='control-chip-end-icon'>
                    {typeof endIcon === 'string' ? (
                        <i className={`fa-solid end-icon ${endIcon}`}></i>
                    ) : (
                        endIcon
                    )}
                </span>
            }
            {props.dismissible && (
                <IconButton
                    data-testid='chip-button-dismiss'
                    icon='fa-solid fa-times'
                    className='!py-0'
                    onClick={props.onDismiss || props.onClose}
                />
            )}
        </div>
    )
}

export type ChipPops = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    startIcon?: string | ReactElement
    endIcon?: string | ReactElement
    url?: string
    color?: string
    fileId?: number
    userId?: number
    showFileId?: boolean
    label?: React.ReactElement | string
    dismissible?: boolean
    onDismiss?: () => void
    onClose?: () => void
}

import { Link } from "react-router-dom"
import { Menu, MenuProps } from "./Menu"
import { IconButton } from "@components/button/IconButton"
import { useMemo } from "react"
import { useFileUrl, useUserProfilePicture } from "@hooks/assets"
import { Avatar } from "@components/avatar/Avatar"
import { Chip } from "@components/chip"

export const MenuItem = (props: MenuItemProps) => {

    const fileUrl = useFileUrl()
    const userProfilePictureUrl = useUserProfilePicture()

    if (props.divide) {
        return (
            <li data-testid={props?.['data-testid']} className='border-b'></li>
        )
    }

    const disabledClass = useMemo(() => {
        return props.disabled ? 'disabled:opacity-25' : ''
    }, [props])

    const startItem = (
        <div className='item-header'>
            {typeof props.startIcon === 'string' ? (
                <i className={props.startIcon}></i>
            ) : (
                props.startIcon
            )}

            {props.color && (
                <IconButton
                    className='w-4 h-4'
                    style={{ backgroundColor: props.color }}
                />
            )}
            {(props.showFileId) && (
                <Avatar src={props.fileId && fileUrl(props.fileId)} fullName={props.label} size="xs" />
            )}
            {(props.userId) && (
                <Avatar src={userProfilePictureUrl(props.userId)} size="xs" />
            )}
        </div>
    )

    const middleItem = (
        <div className='flex-1'>
            <span>{props.label}</span>
        </div>
    )

    const endItem = (
        <div className='item-footer'>
            {props.badge !== undefined && <Chip label={props.badge?.toString()} />}
            {typeof props.endIcon === 'string' ? (
                <i className={props.endIcon}></i>
            ) : (
                props.endIcon
            )}
        </div>
    )

    const menuItem = (
        <div className="flex items-center gap-2 w-full">
            <span>
                {`${props.index ? `${props.index}.` : ''}`}
            </span>

            <div className="flex items-center gap-2 w-full">
                {props.onlyEndIcon !== true && startItem}
                {(!props.onlyEndIcon && !props.onlyStartIcon) && middleItem}
                {props.onlyStartIcon !== true && endItem}
            </div>
        </div>
    )

    return (
        <li
            data-testid={props?.['data-testid']}
            data-testname={props?.['data-testname']}
            data-test-value={props.value}
            data-option-value={props.value}
            className={`${props.className}`}
            onClick={() => props.onClick?.(props)}
        >

            {props.externalLink && (
                <a
                    href={props.externalLink}
                    title={props.label}
                    className={`${disabledClass}`}
                    target='_blank'
                >
                    {menuItem}
                </a>
            )}

            {props.link && (
                <Link
                    to={props.link}
                    className={`${disabledClass}`}
                >
                    {menuItem}
                </Link>
            )}

            {!props.link && !props.externalLink && (
                <a
                    href='#'
                    className={`${disabledClass}`}
                    onClick={(e) => e.preventDefault()}
                >
                    {menuItem}
                </a>
            )}

            {
                props.items && (
                    <Menu
                        onlyStartIcon={props.onlyStartIcon}
                        onlyEndIcon={props.onlyEndIcon}
                        items={props.items}
                        onClick={props.onClick}
                        showFn={props.showFn}
                        activeFn={props.activeFn}
                    />
                )
            }
        </li >
    )
}

export type MenuItemProps = {
    ke?: string
    /** Flag for rendering separator */
    divide?: boolean
    onClick?: MenuProps['onClick']
    items?: Array<MenuItemProps | undefined>
    /** Label of the button */
    label?: string

    inputLabel?: string

    color?: string

    badge?: number

    fileId?: number

    showFileId?: boolean

    userId?: number

    onlyStartIcon?: boolean

    onlyEndIcon?: boolean
    /** Icon of the button */
    startIcon?: string | React.ReactNode

    endIcon?: string | React.ReactNode

    link?: string

    linkFn?: MenuItemCallback<string | undefined>

    externalLink?: string

    externalLinkFn?: MenuItemCallback<string | undefined>

    className?: string

    'data-testid'?: string

    'data-testname'?: string

    disabled?: boolean

    index?: number

    showFn?: MenuProps['showFn']
    
    activeFn?: MenuProps['showFn']

    [key: string]: any
}

export type MenuItemCallback<TReturn> = (
    menu: MenuItemProps,
    index?: number
) => TReturn


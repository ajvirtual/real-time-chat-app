import React, { useCallback } from "react"
import { Avatar } from './Avatar'
import { Tooltip, TooltipProps } from '../tooltip/Tooltip'
import { useUserProfilePicture } from '../../hooks/assets/useUserProfilePicture'
import { Link } from "react-router-dom"

export const AvatarGroup = ({ avatarItems, size, itemLimit = 3, onClickAvatar, classNameFn, activeFn, disableTooltip }: AvatarGroupProps) => {

    const profilePictureUrl = useUserProfilePicture()
    const renderAvatar = useCallback((item: AvatarGroupItem) => {
        const className = classNameFn?.(item)
        const active = activeFn?.(item)
        let avatar = (
            <Avatar
                src={profilePictureUrl(item.pictureId)}
                size={size || "sm"}
                className={`
                        inline-block cursor-pointer
                        ${active ? `!border-primary` : ''}
                        ${className}
                    `}
            />
        )

        if (disableTooltip !== true) {
            avatar = (
                <Tooltip text={item.title} trigger="hover" placement="top">
                    {avatar}
                </Tooltip>
            )
        }

        if (item.itemLink) {
            return (
                <Link to={item.itemLink} key={item.pictureId}>
                    {avatar}
                </Link>

            )
        }

        return (
            <div onClick={() => onClickAvatar(item)}>
                {avatar}
            </div>
        )
    }, [classNameFn, activeFn, onClickAvatar])

    return (
        <div className="flex -space-x-2 items-center">
            {
                avatarItems?.slice(0, itemLimit).map((item) => {
                    return renderAvatar(item)
                })
            }
            {
                avatarItems?.length > itemLimit && (
                    <Tooltip
                        placement="bottom"
                        text={
                            <div className="max-w-[150px] flex items-center flex-wrap p-2">
                                {
                                    avatarItems?.slice(itemLimit).map((item) => {
                                        return renderAvatar(item)
                                    })
                                }
                            </div>
                        }
                    >
                        <span
                            className={`
                                rounded-full
                                ring-1
                                ring-white
                                bg-[#d9d9d9]
                                text-xs
                                text-white
                                flex
                                items-center
                                justify-center
                                border-[2px] 
                                shadow-xl 
                                border-white 
                                ${size === 'xl' ? 'h-28 w-28' : ''}
                                ${size === 'lg' ? 'h-20 w-20' : ''}
                                ${size === 'sm' ? 'h-8 w-8' : ''}
                                ${size === 'xs' ? 'h-6 w-6' : ''}
                                ${size === '2xs' ? 'h-5 w-5' : ''}
                                ${!size || size === 'md' ? 'h-12 w-12' : ''}
                            `}
                        >
                            +{avatarItems.length - itemLimit}
                        </span>
                    </Tooltip>
                )
            }
        </div >
    )

}

export type AvatarGroupProps = {
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
    avatarItems: Array<AvatarGroupItem>,
    onClickAvatar?: (e) => void
    activeFn?: (item: AvatarGroupItem) => boolean
    classNameFn?: (item: AvatarGroupItem) => string
    itemLimit?: number
    disableTooltip?: boolean
}

export type AvatarGroupItem = {
    id?: number
    pictureId: number | string,
    title: TooltipProps['text'],
    itemLink?: string
}

import React, { ImgHTMLAttributes, useMemo } from "react"
import { tailwindcss } from '@chat/config'
import { useUrlParamsEncode } from "@hooks/url";

export const Avatar = ({ size, fullName, ...props }: AvatarProps) => {

    const encodeUrl = useUrlParamsEncode()
    const src = useMemo(() => {
        if (props.src) {
            return props.src
        }

        if (fullName) {
            return `https://avatar.oxro.io/avatar?${encodeUrl({ name: fullName, background: 'E4260E', color: 'ffffff' })}`
        }

        return undefined
    }, [props, fullName])

    return (
        <img
            {...props}
            src={src}
            className={`
                inline-block 
                border-[2px]
                ${size === 'xl' ? 'h-28 w-28' : ''}
                ${size === 'lg' ? 'h-20 w-20' : ''}
                ${size === 'sm' ? 'h-8 w-8' : ''}
                ${size === 'xs' ? 'h-6 w-6' : ''}
                ${size === '2xs' ? 'h-5 w-5' : ''}
                ${!size || size === 'md' ? 'h-12 w-12' : ''}
                rounded-full
                shadow-xl 
                border-white 
                ${props.className}`}
        />
    )
}

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> &  {
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
    fullName?: string
}

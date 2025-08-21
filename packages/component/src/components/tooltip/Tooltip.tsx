import React, { createRef, ReactNode, useEffect, useState } from 'react'
import './css/style.css'
import { useDebounce } from '@hooks/utils/useDebounce'
import { Dropdown, DropdownProps } from '@components/dropdown/Dropdown'
import { Box } from '@components/box/Box'

export const Tooltip = (props: TooltipProps) => {

    const containerRef = createRef<HTMLDivElement>()
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement>()
    const debounce = useDebounce()

    useEffect(() => {
        if (props.show && containerRef.current) {
            setAnchorEl(containerRef.current);
        } else if (!props.show) {
            setAnchorEl(undefined);
        }
    }, [props.show]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.trigger === 'click') {
            setAnchorEl(e.currentTarget)
        }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.trigger === 'hover') {
            setAnchorEl(e.currentTarget)
        }
    }

    const handleMouseLeave = () => {
        if (props.trigger === 'hover') {
            handleClose()
        }
    }

    const handleClose = () => {
        if (props.closeTimeout === 0) {
            setAnchorEl(undefined)
            return;
        }
        debounce(() => setAnchorEl(undefined), props.closeTimeout || 750)
    }

    return (
        <>
            <div
                className={props.className}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={containerRef}>
                {props.children}
            </div>
            <Dropdown placement={props.placement} anchorEl={anchorEl} onClose={handleClose}>
                <>
                    {
                        typeof props.text === 'string'
                        ? (
                            <p className={`px-4 py-2 ${props?.textClassName}`}>
                                {props.text}
                            </p>
                        )
                        : props.text
                    }
                </>
            </Dropdown>
        </>
    )
}

Tooltip.defaultProps = {
    trigger: 'click',
    closeTimeout: 750,
    alwaysVisible: false
}

export type TooltipProps = {
    /** Text to show inside tooltip */
    text?: string | ReactNode
    /** Way to trigger tooltip */
    trigger?: 'click' | 'hover'
    show?: boolean;
    closeTimeout?: number
    children?: ReactNode
    placement?: DropdownProps['placement']
    className?: string
    textClassName?: string
}

import React, { HTMLAttributes } from 'react'
import './css/style.css'

export const Box = ({ title, icon, tools, description, badge, ...props }: BoxProps) => {
    return (
        <div {...props} className={`box box-white shadow-lg ${props.className}`} ref={(e) => props.onRef?.(e)}>
            {title && (
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-start gap-2'>
                            <h3 data-testid={props?.titleTestId ?? 'box-title'} className='mb-0'>
                                {icon && typeof icon === 'string' ? (
                                    <i className={icon} data-testid='box-icon'></i>
                                ) : (
                                    icon
                                )}

                                {title}
                            </h3>
                            {badge}
                        </div>

                        {tools}
                    </div>
                    {description}
                </div>
            )}

            {props.children}
        </div>
    )
}

export type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /** Icon of the box */
    icon?: string | React.ReactNode,
    /** Title of the box */
    title?: string | React.ReactNode,

    titleTestId?: string

    tools?: React.ReactNode,

    description?: React.ReactNode,

    badge?: React.ReactNode

    style?: React.CSSProperties

    onRef?: (ref: HTMLDivElement) => void
}

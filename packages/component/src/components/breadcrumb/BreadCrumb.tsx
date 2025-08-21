import React, { HTMLAttributes } from "react"
import { Link } from 'react-router-dom'
import "./css/breadcrumb.css"

export const BreadCrumb = ({ items, className, children, ...props }: BreadCrumbProps) => {

    return (
        <div className="w-full">
            <ul className={`breadcrumb ${className}`} {...props}>
                {items
                    .filter(
                        (item): item is BreadCrumbItemProps =>
                            item !== undefined
                    )
                    .filter((item) => props.showFn?.(item) !== false)
                    .map((item, index) => {
                        const className = `breadcrumb-item flex-intial ${props.activeFn?.(item) && 'active'
                            } ${item.className}`
                        const menu = (
                            <>
                                {typeof item.startIcon === 'string' ? (
                                    <i className={item.startIcon}></i>
                                ) : (
                                    item.startIcon
                                )}
                                {item.label}
                                {typeof item.endIcon === 'string' ? (
                                    <i className={item.endIcon}></i>
                                ) : (
                                    item.endIcon
                                )}
                            </>
                        )

                        return (
                            <li className={className} key={index}>
                                {item.externalLink && (
                                    <a
                                        href={item.externalLink}
                                        title={item.label}
                                        target='_blank'
                                    >
                                        {menu}
                                    </a>
                                )}

                                {item.link && (
                                    <Link to={item.link}>{menu}</Link>
                                )}

                                {!item.externalLink && !item.link && (
                                    <span>{menu}</span>
                                )}
                                {
                                    index < (items.length - 1) &&
                                    <div className="separator"></div>
                                }
                            </li>
                        )
                    })}
            </ul>
            {children}
        </div>
    )
}


export type BreadCrumbItemProps = {
    /** Flag for rendering separator */
    divide?: boolean
    onClick?: BreadCrumbProps['onClick']
    items?: Array<BreadCrumbItemProps | undefined>
    /** Label of the button */
    label?: string,
    /** Icon of the button */
    startIcon?: string,

    endIcon?: string,

    link?: string

    externalLink?: string

    className?: string
}

export type BreadCrumbProps = HTMLAttributes<HTMLUListElement> & {
    items: Array<BreadCrumbItemProps | undefined>
    /** 
     * Callback to evaluate active menu
     * @param {Object} menu
     * * @param {number}
     * @returns {Boolean} return true will add an "active" class inside the menu
     */
    activeFn?: (menu: BreadCrumbItemProps) => boolean,
    /** 
     * Callback to evaluate menu
     * @param {Object} menu
     * * @param {number}
     * @returns {Boolean} return false will hide menu
     */
    showFn?: (menu: BreadCrumbItemProps) => boolean,
    onClick?: (menu: BreadCrumbItemProps) => void,
}

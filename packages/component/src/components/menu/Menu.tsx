import _ from 'lodash'
import React, { HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'
import './css/menu.css'
import { MenuItem, MenuItemCallback, MenuItemProps } from './MenuItem'

export const Menu = ({
    items,
    onClick,
    loading,
    loadingRowCount,
    activeFn,
    showFn,
    showIndex,
    disabledFn,
    type,
    name,
    className,
    ...props
}: MenuProps) => {
    return (
        <ol
            data-testid='menu'
            className={`menu ${type === 'HORIZONTAL' ? 'menu-horizontal' : ''
                }  ${className}`}
            {...props}
        >
            {items
                .filter((item): item is MenuItemProps => !!item)
                .filter((item) => showFn?.(item) !== false)
                .filter((item) => item?.showFn?.(item) !== false)
                .map((item, index) => {
                    const className = `menu-item ${activeFn?.(item, index) && 'active'
                        } ${item.className}`
                    const disabled = disabledFn?.(item, index)
                    const externalLink =
                        item.externalLinkFn?.(item, index) || item.externalLink
                    const link = item.linkFn?.(item, index) || item.link!
                    const testid = item?.['data-testid'] ?? `menu-item${name ? `-${name}` : ''}-${index}`

                    return (
                        <MenuItem
                            key={index}
                            {...item}
                            className={className}
                            disabled={disabled}
                            link={link}
                            externalLink={externalLink}
                            index={showIndex ? index + 1 : undefined}
                            onlyStartIcon={props.onlyStartIcon}
                            onlyEndIcon={props.onlyEndIcon}
                            data-testid={testid}
                            data-testname={name}
                            onClick={() => onClick?.(item, index)}
                            showFn={showFn}
                            activeFn={activeFn}
                        />
                    )
                })}

            {loading &&
                _.times(loadingRowCount).map((item, index) => (
                    <li className='menu-item' key={index}>
                        <div
                            className='flex gap-3'
                            data-testid={`list-row-skeleton-${index}`}
                        >
                            <Skeleton width={200} />
                        </div>
                    </li>
                ))}
        </ol>
    )
}

Menu.defaultProps = {
    loadingRowCount: 1
}


export type MenuProps = Omit<
    HTMLAttributes<HTMLUListElement>,
    'onClick' | 'onMouseLeave' | 'onMouseEnter'
> & {
    name?: string
    items: Array<MenuItemProps | undefined>

    type?: 'VERTICAL' | 'HORIZONTAL'

    loading?: boolean

    loadingRowCount?: number

    onlyStartIcon?: boolean

    onlyEndIcon?: boolean

    showIndex?: boolean

    /**
     * Callback to evaluate active menu
     * @param {Object} menu
     * * @param {number}
     * @returns {Boolean} return true will add an "active" class inside the menu
     */
    activeFn?: MenuItemCallback<boolean | undefined>
    /**
     * Callback to evaluate menu
     * @param {Object} menu
     * * @param {number}
     * @returns {Boolean} return false will hide menu
     */
    showFn?: MenuItemCallback<boolean | undefined>
    disabledFn?: MenuItemCallback<boolean | undefined>
    onClick?: MenuItemCallback<void>
}

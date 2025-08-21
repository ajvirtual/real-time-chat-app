import './css/left-sidebar.css'
import React, { ReactNode } from "react"
import { Menu } from '@components/menu/Menu'
import { MenuItemProps } from '@components/menu/MenuItem'

export const LeftSidebar = (props: LeftSidebarProps) => {

    return (
        <div className="sidebar left-sidebar">
            {
                props.menus.map((item, index) => (
                    <div key={index}>
                        <label>{item.label}</label>
                        <Menu items={item.items || []} />
                    </div>
                ))
            }

            <p className="mt-auto">
                {props.footer}
            </p>
        </div>
    )
}

export type LeftSidebarProps = {
    menus: Array<MenuItemProps>
    footer?: ReactNode
}

const i18n = [
    'Bo.LeftSidebar.Menu.Apps.label',
    'Bo.LeftSidebar.Menu.ListOfValues.label',
]

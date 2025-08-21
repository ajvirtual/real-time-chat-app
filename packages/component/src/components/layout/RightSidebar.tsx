import './css/left-sidebar.css'
import { HTMLAttributes } from "react"

export const RightSidebar = ({ onClose,  ...props }: RightSidebarProps) => {

    return (
        <div {...props} className={`sidebar right-sidebar ${props.className}`}>
            {
                onClose && (
                    <div className='sidebar-close'>
                        <button className="sidebar-close-icon" onClick={onClose}>
                            <i className='fa-solid fa-times'></i>
                        </button>
                    </div>
                )
            }
            {props.children}
        </div>
    )
}

export type RightSidebarProps = HTMLAttributes<HTMLDivElement> & {
    onClose?: () => void
}


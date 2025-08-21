import React, { ReactNode } from "react"

export const DialogTitle = (props: DialogTitleProps) => {

    return (
        <div className={`dialog-header`}>
            <h4 className="font-semibold">{props.title}</h4>
        </div>
    )
}

export type DialogTitleProps = {
    title?: string | ReactNode
    dismissible?: boolean
}

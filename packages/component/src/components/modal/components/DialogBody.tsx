import { Box } from "@components/box"
import React, { HTMLAttributes } from "react"

export const DialogBody = (props: DialogBodyProps) => {

    return (
        <Box {...props} className={`dialog-body ${props.className}`}>

        </Box>
    )
}

export type DialogBodyProps = HTMLAttributes<HTMLDivElement>

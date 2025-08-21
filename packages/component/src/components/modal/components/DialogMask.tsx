import React, { HTMLAttributes, useMemo } from "react"

export const DialogMask = (props: DialogMaskProps) => {

    const zIndex = useMemo(() => {
        const adr = document.querySelectorAll('.dialog-mask')
        const initialZIndex = 1300
        return initialZIndex + adr.length
    }, [])

    return (
        <div
            {...props}
            className={`dialog-mask ${props.className}`}
            style={{ ...props.style, zIndex }}>
            <style>{`body { overflow: hidden; }`}</style>
            {props.children}
        </div>
    )
}

export type DialogMaskProps = HTMLAttributes<HTMLDivElement>

import React, { ReactElement, useEffect, useState } from "react"
import { Modifier, usePopper } from "react-popper";
import { Options } from '@popperjs/core';
import ClickAwayListener from "react-click-away-listener";
import './css/dropdown.css'
import ReactDOM from "react-dom";
import { Box } from "@components/box/Box";
import maxSize from "popper-max-size-modifier";


const applyMaxSize: Partial<Modifier<string, object>> = {
    name: "applyMaxSize",
    enabled: true,
    phase: "beforeWrite",
    requires: ["maxSize"],
    fn({ state }) {
        const { width, height } = state.modifiersData.maxSize;
        state.styles.popper = {
            ...state.styles.popper,
            // maxWidth: `${Math.min(450, width)}px`,
            maxHeight: `${(height - 20)}px`
        };
    }
};

export const Dropdown = (props: DropdownProps): React.ReactPortal => {

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(props.anchorEl, popperElement, {
        ...props.PopperOptions,
        modifiers: [
            { name: 'arrow', options: { padding: 5, element: arrowElement } },
            maxSize,
            applyMaxSize,
            {
                name: 'preventOverflow',
                options: {
                    rootBoundary: "viewport",
                    padding: 20
                },
            },
        ],
        placement: props.placement,
        strategy: "fixed"
    });

    useEffect(() => {
        props.onRef?.(popperElement)
    }, [popperElement])

    return ReactDOM.createPortal(
        (
            <div
                className="dropdown flex flex-col bg-transparent "
                ref={setPopperElement}
                {...attributes.popper}
                style={{ ...styles.popper, minWidth: props.anchorEl?.clientWidth }}>
                {
                    props.anchorEl && props.arrow &&
                    <div className="dropdown-arrow" ref={setArrowElement} style={styles.arrow} />
                }
                {
                    props.anchorEl && props.children &&
                    <ClickAwayListener onClickAway={() => props.onClose?.()}>
                        <Box className="p-0 h-full !shadow-lg animate__animated animate__fadeInUp animate-[200ms] animate overflow-y-auto overflow-x-hidden dropdown-content">
                            {
                                React.cloneElement(props.children)
                            }
                        </Box>
                    </ClickAwayListener>
                }
            </div>
        ),
        document.body
    )

}


export type DropdownProps = {
    placement?: Options['placement']
    anchorEl?: HTMLElement
    arrow?: boolean
    children?: ReactElement
    PopperOptions?: Options
    onClose?: () => void
    onRef?: (ref?: HTMLDivElement) => void
}

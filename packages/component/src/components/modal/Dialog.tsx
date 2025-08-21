import React, { useCallback, useEffect, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import { GenericSuspense, IconButton } from ".."
import { DialogBody } from "./components/DialogBody"
import { DialogFooter, DialogFooterProps } from "./components/DialogFooter"
import { DialogMask } from "./components/DialogMask"
import { DialogTitle, DialogTitleProps } from "./components/DialogTitle"
import './css/dialog.css'
import { useFormDataIsDirty } from "@hooks/formdata"
import { useTranslations } from "@hooks/translation"

export const Dialog = (props: DialogProps) => {

    const [
        TITLE,
        MESSAGE,
        OK,
        CANCEL
    ] = useTranslations(i18n)
    const isControlDirty = useFormDataIsDirty(props.controlListId ?? 'no-control')

    const [showControlConfirmation, setShowControlConfirmation] = useState(false)
    const showCloseDialogConfirmation = useMemo(() => {
        return showControlConfirmation && props.controlListId && isControlDirty
    }, [props.controlListId, isControlDirty, showControlConfirmation])

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (['Esc', 'Escape'].includes(e.key)) {
            close()
        }
    }, [])

    const close = (force?: boolean) => {
        if (force !== true && props.controlListId && isControlDirty) {
            setShowControlConfirmation(true)
            return
        }
        props.onClose?.()
        props.onDismiss?.()
    }

    const handleControlConfirmationConfirm = () => {
        close(true)
    }

    if (!props.open) {
        return (<></>)
    }

    return ReactDOM.createPortal(
        (
            <>
                <DialogMask>
                    <DialogBody
                        className={`animate__animated relative w-full ${props.className || 'max-w-lg'} ${props.open ? 'animated__fadeInDown' : 'animated__fadeOutUp'}`}
                        data-testid={props['data-testid']}>
                        {
                            props.title &&
                            <DialogTitle {...props} />
                        }
                        {
                            props.dismissible !== false &&
                            <IconButton
                                data-testid={props['data-testid'] ? `${props['data-testid']}-button-dismiss` : "dialog-title-button-dismiss"}
                                className="absolute top-4 right-4 z-20"
                                icon="fa-solid fa-times"
                                onClick={() => close()}
                            />

                        }
                        <GenericSuspense>
                            <div>
                                {props.message || props.children}
                            </div>
                        </GenericSuspense>
                        {
                            (props.confirmation || props.btnOk || props.btnCancel) &&
                            <DialogFooter {...props} />
                        }
                    </DialogBody>
                </DialogMask>
                {
                    showCloseDialogConfirmation &&
                    <Dialog 
                        open={showCloseDialogConfirmation}
                        title={TITLE}
                        message={MESSAGE}
                        btnOk={{ label: OK }}
                        btnCancel={{ label: CANCEL }}
                        onConfirm={handleControlConfirmationConfirm}
                        onClose={() => setShowControlConfirmation(false)}
                        onCancel={() => setShowControlConfirmation(false)}
                        />
                }
            </>
        ),
        document.body
    )
}

const i18n = [
    'std_confirmation',
    'std_confirmation_close_control',
    'std_ok',
    'std_cancel'
]

export type DialogProps = DialogTitleProps & DialogFooterProps & {
    open: boolean
    className?: string
    message?: string
    confirmation?: boolean
    children?: React.ReactNode
    /**
     * Giving the "controlList id" will show a confirmation dialog before closing is the control list is dirty
     */
    controlListId?: string
    onClose?: () => void
    /**
     * @deprecated use "onClose" event instead
     */
    onDismiss?: () => void
}

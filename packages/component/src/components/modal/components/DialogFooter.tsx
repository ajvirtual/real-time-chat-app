import { Button, ButtonProps, ButtonSubmit, ButtonSubmitProps } from "@components/button"
import { useTranslation } from "@hooks/translation"
import React from "react"

export const DialogFooter = (props: DialogFooterProps) => {
    const t = useTranslation()

    return (
        <div className="dialog-footer flex justify-between">
            {
                props.btnCancel &&
                <Button
                    label={t('std_cancel')}
                    {...props.btnCancel}
                    className={`btn-default ${props.btnCancel?.className}`}
                    onClick={props.onCancel} />
            }
            {
                props.btnOk &&
                <ButtonSubmit
                    label={t('std_ok')}
                    {...props.btnOk}
                    className={`btn-primary ml-auto ${props.btnOk?.className}`}
                    onClick={props.onConfirm} />
            }
        </div>
    )
}

export type DialogFooterProps = {
    btnOk?: ButtonSubmitProps
    btnCancel?: ButtonProps
    onConfirm?: () => void
    onCancel?: () => void
}

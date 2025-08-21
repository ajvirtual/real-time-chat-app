import { useDebounce } from "@hooks/utils/useDebounce";
import _ from "lodash";
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { useFormDataError } from "./useFormDataError";
import { useGlobalFormData } from "./useGlobalFormData";
import { useGlobalFormDataError } from "./useGlobalFormDataError";
import { useGlobalFormDataReset } from "./useGlobalFormDataReset";
import { useGlobalFormDataDirtyState } from "./useGlobalFormDataDirtyState";

export const useFormData = <TData extends {} = any>(props: UserFormDataProps<TData>): UseFormData<TData> => {

    const globalStateId = useMemo(() => props.id || _.uniqueId(), [props.id])
    const [formData, setFormData] = useGlobalFormData(globalStateId, props.formData);
    const [errors, setErrors] = useGlobalFormDataError(globalStateId)
    const resetFormData = useGlobalFormDataReset(globalStateId)
    const formDataError = useFormDataError(globalStateId)
    const [isDirty, setIsDirty] = useGlobalFormDataDirtyState(globalStateId)
    const debounceDirty = useDebounce()

    useEffect(() => {
        debounceDirty(() => {
            const _isDirty = !_.isEqual(_.omitBy(formData, _.isEmpty), _.omitBy(props.formData, _.isEmpty))
            if (isDirty !== _isDirty) {
                setIsDirty(_isDirty)
            }

        }, 500)
    }, [formData])

    const handleInputChange = (key: string, value: any) => {
        setFormData((v) => ({ ...v, [key]: value }))
    }

    const debounce = useDebounce()

    const evalErrors = useCallback(() => {
        let _errors: FormDataError = {}

        if (!formData) {
            return {}
        }

        Object.keys(formData).forEach((key) => {
            const value = formData[key]
            const error = props.validate?.(key, value, formData)
            if (error) {
                _errors[key] = error
            }
        })

        props.required?.forEach((key) => {
            const value = formData[key]
            if (value === null || value === undefined || value === '') {
                _errors[key] = requiredErrorMessage
            }
        })

        return _errors
    }, [formData, props.required])

    /**
     * It will scroll into the invalid element that has the same "name" or "id" attribute 
     */
    const isValid = (render: boolean = true): boolean => {
        const _errors = evalErrors()
        if (render) {
            setErrors(_errors)
            // scroll to invalid element
            Object.keys(_errors).forEach((key) => {
                const element = document.getElementById(key) || document.querySelector(`[name=${key}]`)
                element && debounce(() => {
                    element.scrollIntoView?.({ behavior: 'smooth', block: "center", inline: "nearest" })
                }, 100)
            })
        }
        return _.isEmpty(_errors)
    }

    return {
        formData,
        setFormData,
        handleInputChange,
        isValid,
        isDirty,
        errors,
        resetFormData,
        ...formDataError,
    }
}

const requiredErrorMessage = 'std_required_err'

export type UserFormDataProps<TData = any> = {
    id?: string

    formData: TData,
    /**
     * Array that contain all required fields
     */
    required?: Array<string>
    /**
     * Function that check if the entiere form is valid
     * @param name Field name
     * @param value field value
     * @param formData all form data
     * @returns The new error message
     */
    validate?: (name: string, value: any, formData?: TData) =>  string | React.ReactNode | undefined | void
}

export type UseFormData<TData> = {
    formData: TData
    setFormData: Dispatch<SetStateAction<TData>>
    /** Callback that will set form hooks global value */
    handleInputChange: (key: string, value: any) => void
    /**
     * Function that will check if formData is valid
     * It will check if required field is empty and show error
     * Then will execute "validate" function
     * @param render false will prevent rendering of components
     */
    isValid: (render?: boolean) => boolean

    errors?: FormDataError

    getError: (name: string) => string | React.ReactNode | undefined

    hasError?: boolean

    resetFormData?: () => void

    isDirty?: boolean
}

export type FormDataError = Record<string, string | ReactNode>

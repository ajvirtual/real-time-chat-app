import { useTranslation } from '@hooks/translation'
import { SuspenseErrorState } from '@state/SuspenseErrorState'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const GenericSuspenseError = ({
    element,
    message,
    error,
    resetErrorBoundary,
    retry,
    className,
    onRetryClick
}: GenericSuspenseErrorProps) => {
    const [suspenseError, setSuspenseError] = useRecoilState(SuspenseErrorState)
    const t = useTranslation()

    useEffect(() => {
        const _error = suspenseError?.transformError?.(
            error,
            resetErrorBoundary
        )
        setSuspenseError({
            ..._error,
            transformError: suspenseError?.transformError
        })
    }, [])

    return (
        <div
            className={`generic-suspense w-full h-screen flex items-center justify-center ${className}`}
        >
            <div className='px-20 flex flex-col items-center gap-5'>
                {suspenseError?.code && (
                    <h1 className='text-gray'>{suspenseError?.code}</h1>
                )}

                <h4 className='text-gray'>{suspenseError?.title}</h4>

                <p
                    data-testid='generic-suspense-message'
                    className='text-center text-default'
                >
                    {suspenseError?.message}
                </p>

                <button
                    className='btn btn-primary '
                    onClick={onRetryClick}
                    data-testid='generic-suspense-error-retry-btn'
                >
                    {retry || "Retry"}
                </button>
            </div>
        </div>
    )
}

export type GenericSuspenseErrorProps = {
    className?: string
    message?: string
    retry?: string
    error?: Error
    resetErrorBoundary?: any
    element?: React.ReactElement
    onRetryClick?: () => void
}

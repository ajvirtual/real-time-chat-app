import React, { useEffect, useRef } from "react"
import { QueryErrorResetBoundary } from "react-query" 
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { GenericSuspenseError, GenericSuspenseErrorProps } from "./GenericSuspenseError"
import { GenericSuspenseWrapper } from "./GenericSuspenseWrapper"
import { useLocation } from "react-router-dom"

export const GenericSuspense = ({ children, fallback, fallbackError, GenericSuspenseErrorProps }: GenericSuspenseProps) => {

    const resetRef = useRef<() => void>()
    const location = useLocation()

    useEffect(() => {
        resetRef.current?.()
    }, [location])

    const handleFallbackRender = ({ error, resetErrorBoundary, ...rest }: FallbackProps) => {

        console.error(error)
        resetRef.current = resetErrorBoundary

        if (fallbackError) {
            return fallbackError({ error, resetErrorBoundary, ...rest })
        }

        return (
            <GenericSuspenseError
                {...GenericSuspenseErrorProps}
                error={error}
                resetErrorBoundary={resetErrorBoundary}
                onRetryClick={() => resetErrorBoundary()}
            />
        )
    }

    return (
        <QueryErrorResetBoundary>
            {({ reset }) => {
                return (
                    <ErrorBoundary
                        onReset={reset}
                        fallbackRender={handleFallbackRender}>
                        <GenericSuspenseWrapper fallback={fallback}>
                            { children }
                        </GenericSuspenseWrapper>
                    </ErrorBoundary>
    
                )
            }}
        </QueryErrorResetBoundary>
    )
}

export type GenericSuspenseProps = {
    children: React.ReactNode
    fallback?: React.ReactNode
    fallbackError?: ({ error, resetErrorBoundary }?: FallbackProps) => React.ReactElement
    /**
     * Retry click cannot be override from here
     */
    GenericSuspenseErrorProps?: GenericSuspenseErrorProps
}

export { type FallbackProps }

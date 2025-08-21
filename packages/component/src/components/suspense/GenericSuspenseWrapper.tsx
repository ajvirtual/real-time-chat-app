import { MainLogo } from "@components/spinner/MainLogo"
import React, { Suspense } from "react"
import BarLoader from 'react-spinners/BarLoader'

export const GenericSuspenseWrapper = (props: GenericSuspenseWrapperProps) => {

    return (
        <Suspense fallback={props.fallback || <BarLoader className='main-spinner-bar-loader shadow-sm' width="100%" />}>
            { props.children }
        </Suspense>
    )
}

type GenericSuspenseWrapperProps = {
    children: React.ReactNode
    fallback?: React.ReactNode
}

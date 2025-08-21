import React from 'react'
import { UseGoogleLoginOptionsImplicitFlow, useGoogleLogin } from '@react-oauth/google';

export const GoogleOAuth = (props: GoogleProps) => {
    const login = useGoogleLogin({
        flow: 'implicit',
        ...props
    });

    return (
        <>
            {
                React.cloneElement(props.children!, { disabled: props.disabled, onClick: login })
            }
        </>
    )
}

export type GoogleProps = UseGoogleLoginOptionsImplicitFlow & {
    children?: React.ReactElement
    disabled?: boolean
}

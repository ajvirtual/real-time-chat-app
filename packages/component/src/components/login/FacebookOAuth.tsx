import React from 'react'
import FacebookLogin, {FacebookLoginProps} from '@greatsumini/react-facebook-login';

export const FacebookOAuth = (props: FacebookProps) =>  {

    return (
        <FacebookLogin
            {...props}
            render={(renderProps) => React.cloneElement(props.children!, { onClick: renderProps.onClick })}
        />
    )   
}

export type FacebookProps = FacebookLoginProps & {
    children?: React.ReactElement
}
import { useCdnAssets } from '@hooks/assets'
import React from 'react'
import './css/main-logo.css'
import BarLoader from "react-spinners/BarLoader";

export const MainLogo = (props: MainLogProps) => {

    const cdnUrl = useCdnAssets()
    return (
        <div {...props} className={`main-loader ${props.className}`}>
            <div className="main-spinner">
                <div className='flex flex-col justify-center items-center gap-4'>
                    <img src={`/assets/img/logo.png`} className='h-16' />
                    <BarLoader className='main-spinner-bar-loader' />
                </div>
            </div>
        </div>
    )
}

export type MainLogProps = React.HTMLAttributes<HTMLDivElement> & {
    img?: string
}

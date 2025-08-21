import React from 'react'
import './css/style.css'
import { FakeProgressBar } from './FakeProcessBar'
import { MainLogo } from './MainLogo'

export const Spinner: React.FC<SpinnerType> = ({ 
        type, 
        position,
        size,
        className,
        ...props 
    }: SpinnerType) => {

	const render_fake_progress_bar = () => <FakeProgressBar />

    const render_main_logo = () => <MainLogo />

    if (type === 'pulse') {
        return <i className={`fa fa-spinner fa-w fa-pulse ${className}`} style={ props.style }></i> 
    }

	return (
		<div className={"spinner-container spinner-container-" + position + " icon-x-" + size + ' ' + className } style={ props.style }>
			{ type === 'fake-progress' && render_fake_progress_bar() }
            { type === 'main-logo' && render_main_logo() }
			{ !type && <i className="fa fa-spinner fa-w fa-pulse"></i> }
		</div>
	)
}

export type SpinnerType = {
    className?: string,
    style?: React.CSSProperties
    /** Type of the spinner */
    type?: 'valiprocess' | 'fake-progress' | 'main-logo' | 'pulse',
    /** Position of the spinner from spinner-container */
    position?: 'top' | 'left' | 'right' | 'bottom',
    /** Size of the spinner */
    size?: string,
}
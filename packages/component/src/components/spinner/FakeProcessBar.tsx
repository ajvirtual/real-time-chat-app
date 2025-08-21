import React, { useEffect, useRef, useState } from 'react'

/**
 * Render a fake progressbar
 */
export const FakeProgressBar: React.FC<FakeProgressBarType> = ({ step: _step }: FakeProgressBarType) => {

    const [, set_progress] = useState(0)
    const [view_progess, set_view_progress] = useState(0)
    const interval_ref = useRef<number | NodeJS.Timeout>()
    const [step, set_step] = useState<number>(_step || 0.5)

    useEffect(() => {
        begin()
    }, [])

    const count = () => {
        set_progress((current_progress) => {
            const next_progress = current_progress + step;
            const p = Math.round(Math.atan(next_progress) / (Math.PI / 2) * 100 * 1000) / 1000
            set_view_progress(p)
            if (p >= 100){
                clearInterval(interval_ref.current as number);
            }else if(p >= 70) {
                set_step(0.1)
            }
            
            return next_progress 
        })
    }

    const begin = () => {
        interval_ref.current = setInterval(count, 100)
    }

    return (
        <div className="progress">
            <div 
                className="progress-bar" 
                role="progressbar"
                style={{width: `${view_progess}%`}}></div>
        </div>
    )
}

FakeProgressBar.defaultProps = {
    step: 0.25
}

export type FakeProgressBarType = {
    /** Control speed of the progress bar */
    step?: number
}
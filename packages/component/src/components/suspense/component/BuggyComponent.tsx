import React, { useEffect, useState } from "react"

export const BuggyComponent = () => {
    
    const [triggerError, setTriggerError] = useState(false)
    useEffect(() => {
        if (triggerError) {
            throw new Error('Test') 
        }
    }, [triggerError])

    const handleClick = () => {
        setTriggerError(true)
    }

    return (
        <button data-testid="buggy-component-btn" onClick={handleClick}>
            Click Me
        </button>
    )
}

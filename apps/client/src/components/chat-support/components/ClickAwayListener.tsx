import React, { useEffect, useRef } from 'react';

const ClickAwayListener = ({ children, onClickAway }: ClickAwayListenerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            onClickAway();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <div ref={containerRef} className='flex justify-center'>{children}</div>;
};


type ClickAwayListenerProps = {
    children: React.ReactNode;
    onClickAway: () => void;
}

export default ClickAwayListener;
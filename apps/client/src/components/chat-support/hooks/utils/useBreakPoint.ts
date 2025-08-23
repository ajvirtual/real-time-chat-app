import { useState, useEffect, useCallback } from "react";

export const useBreakpoints = () => {

    const evalBreakPoint = useCallback(() => {
        return {
            xs: window.matchMedia("(max-width: 639px)").matches,
            sm: window.matchMedia("(max-width: 768px)").matches,
            md: window.matchMedia("(max-width: 1024px)").matches,
            lg: window.matchMedia("(max-width: 1280px)").matches,
            xl: window.matchMedia("(max-width: 1535px)").matches,
            xxl: window.matchMedia("(min-width: 1536px)").matches,
        }
    }, [])

    const [breakpoints, setBreakpoints] = useState(evalBreakPoint());

    useEffect(() => {
        const handleResize = () => {
            setBreakpoints(evalBreakPoint());
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return breakpoints;

};
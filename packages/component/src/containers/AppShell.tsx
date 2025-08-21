import { useNavigate } from "react-router-dom";
import { AppRouteProps, AppRoutes } from "./AppRoutes"
import { useEffect } from "react";
export const AppShell = (props: AppShellProps) => {

    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/chat-support');
    }, [navigate]);
    
    return (
        <>
            <AppRoutes routes={props.routes} />
        </>
    )
}

export type AppShellProps = {
    routes: Array<AppRouteProps>
    /** 
     * Routes that authorized when user is logged 
     */
    protectedRoutes?: Array<string> | '*',
    /**
     * Routes that accessible even if "proctedRoutes" is "*"
     */
    unProtectedRoutes?: Array<string>
    /** Initial routes */
    initialPath?: string
    /** Path where redirect if current route is unAuthorized */
    loginPath?: string
}


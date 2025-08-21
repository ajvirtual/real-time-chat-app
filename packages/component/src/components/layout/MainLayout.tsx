
import { ReactNode } from "react";

export const MainLayout = (props: MainLayoutProps) => {
    return (
        <div className="app-layout">
            {props.navBar}
            <div className="flex gap-10 w-full">
                {props.leftSideBar}
                {props.children}
                {props.rightSideBar}
            </div>
        </div>
    );
};

export type MainLayoutProps = {
    navBar?: ReactNode
    leftSideBar?: ReactNode
    rightSideBar?: ReactNode
    children?: ReactNode
}

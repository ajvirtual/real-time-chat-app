import { AppRouteProps } from "@chat/component";
import { ChatSupportRoutes } from "@chat/chat-support";
import MainContainer from "container/MainContainer";

export const Routes: Array<AppRouteProps> = [
    {
        path: '',
        element: <MainContainer />,
        children: [
            ...ChatSupportRoutes
        ],
    },
];
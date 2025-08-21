import { AppRouteProps } from '@chat/component'
import ChatSupportContainer from './container/ChatSupportContainer'

export const ChatSupportRoutes: Array<AppRouteProps> = [
    {
        path: "chat-support",
        element: <ChatSupportContainer />
    },
];

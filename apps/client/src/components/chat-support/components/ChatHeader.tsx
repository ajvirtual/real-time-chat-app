import { ArrowLeft, Phone, Video } from "lucide-react"
import { TChatProps } from "../container/ChatSupportContainer"
import { useMemo } from "react";

export const ChatHeader = (props: TChatHeader) => {

    const onlineStatusText = useMemo(() => {
        return props.isOnline ? 'Online' : 'Offline';
    }, [props])

    return (
        <div className="chat-header">
            <div className="header-left">
                <button className="back-button">
                    <ArrowLeft />
                </button>
                <div className="avatar">AT</div>
                <div className={`user-info`}>
                    <h3>{props?.userName ?? ''}</h3>
                    <p className={`${props.isOnline ? 'online' : 'offline'}`}>{onlineStatusText}</p>
                </div>
            </div>
            <div className="header-actions">
                <button className="action-button">
                </button>
            </div>
        </div>
    )
}

type TChatHeader = TChatProps & {
    userName?: string;
    isOnline?: boolean;
}
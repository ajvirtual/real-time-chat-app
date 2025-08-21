import { TChatProps } from "container/ChatSupportContainer"
import { ArrowLeft, Phone, Video } from "lucide-react"

export const ChatHeader = (props: TChatProps) => {
    return (
        <div className="chat-header">
            <div className="header-left">
                <button className="back-button">
                    <ArrowLeft />
                </button>
                <div className="avatar">JA</div>
                <div className="user-info">
                    <h3>Jhon Abraham</h3>
                    <p>Active now</p>
                </div>
            </div>
            <div className="header-actions">
                <button className="action-button">
                </button>
            </div>
        </div>
    )
}


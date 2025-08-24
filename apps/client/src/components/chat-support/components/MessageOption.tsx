import React from 'react';
import { Smile, MessageCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import ClickAwayListener from './ClickAwayListener';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type MessageOptionsProps = {
    messageId?: number | null;
    isFromUser: boolean;
    activeMessageId?: number | null;
    setActiveMessageId?: (id?: number | null) => void;
    onReact: (id: number, reaction?: string) => void;
    onRespond: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
};

const MessageOptions: React.FC<MessageOptionsProps> = ({
    messageId,
    isFromUser,
    activeMessageId,
    setActiveMessageId,
    onReact,
    onRespond,
    onDelete,
    onEdit,
}) => {
    const [showReactions, setShowReactions] = React.useState(false);

    const handleReact = (emojiData: EmojiClickData, event: MouseEvent) => {
        onReact(messageId!, emojiData.emoji);
        setShowReactions(false);
    };

    return (
        <div className="message-options">
            <ClickAwayListener onClickAway={() => setShowReactions(false)}>
                <div className="reactions-container">
                    <EmojiPicker
                        open={showReactions}
                        lazyLoadEmojis
                        reactionsDefaultOpen
                        onEmojiClick={handleReact}
                    />
                </div>
            </ClickAwayListener>
            <button
                className="react-button"
                onClick={() => setShowReactions(!showReactions)}
            >
                <Smile width={20} opacity={0.1} transform="scale(1.1)" />
            </button>
            <button
                className="respond-button"
                onClick={() => onRespond(messageId!)}
            >
                <MessageCircle width={20} opacity={0.1} transform="scale(1.1)" />
            </button>
            <div className="ellipsis-menu">
                {
                    isFromUser && (
                        <button
                            className="ellipsis-button"
                            onClick={() =>
                                setActiveMessageId?.(activeMessageId === messageId ? null : messageId)
                            }
                        >
                            <MoreHorizontal width={20} opacity={0.1} />
                        </button>
                    )
                }

                {activeMessageId === messageId && (
                    <ClickAwayListener onClickAway={() => setActiveMessageId?.(null)}>
                        <div className="dropdown-menu">
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    onDelete(messageId!)
                                    setActiveMessageId?.(null)
                                }}
                            >
                                <Trash2 /> Delete
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    onEdit(messageId!)
                                    setActiveMessageId?.(null);
                                }}
                            >
                                <Edit /> Edit
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    onRespond(messageId!)
                                    setActiveMessageId?.(null)
                                }}
                            >
                                <MessageCircle /> Reply
                            </button>
                        </div>
                    </ClickAwayListener>
                )}
            </div>
        </div>
    );
};

export default MessageOptions;
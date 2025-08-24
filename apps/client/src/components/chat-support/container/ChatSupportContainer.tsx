import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { ChatHeader } from '../components/ChatHeader';
import { InputArea } from '../components/InputArea';
import MessageOptions from '../components/MessageOption';
import { Paperclip } from 'lucide-react';
import { ImageViewer } from '../components/ImageViewer';
import { MessageItem } from '../components/MessageItem';
import moment from 'moment';
import '../main.css'
import { TypingIndicator } from '../components/TypingIndicator';

export type Message = {
    id?: number;
    text?: string;
    timestamp: string;
    userId?: number;
    file?: File;
    image?: string;
    roomId?: number;
    isAttachment?: boolean;
    reaction?: string;
    replyTo?: number;
    edited?: boolean;
    removed?: boolean;
};

const ChatSupportContainer = (props: TChatProps) => {
    const [socket, setSocket] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [roomId, setRoomId] = useState<number | null>(null);
    const [typing, setTyping] = useState(false);
    const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const [currentMessageToEdit, setCurrentMessageToEdit] = useState<Message | null>(null);
    const [fullscreenImage, setFullScreenImage] = useState<File | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const hasScrolledToBottomRef = useRef<boolean>(false);
    const [otherUser, setOtherUser] = useState<{ userName?: string; isOnline?: boolean } | null>(null);

    useEffect(() => {
        const newSocket = io(`http://localhost:${process.env.SERVER_CHAT_PORT ?? 4000}`, {
            reconnectionDelayMax: 20000,
            auth: { userId: props?.userId },
            query: {
                "chat-key": "chat-support"
            },
            transports: ["websocket"],
        });

        // Attach event listeners
        newSocket.on("connect", () => {
            console.log("WebSocket connected:", newSocket.id);
            notifyOnlineStatus(newSocket)
        });

        newSocket.on("user:online", ({ userName }) => {
            setOtherUser({ userName, isOnline: true});
        });

        newSocket.on("peer:active", ({ online }) => {
            setOtherUser((prev) => ({ ...prev, isOnline: online }));            
        });

        newSocket.emit("getRoom", { userId: props?.userId, peerId: props?.peerId });

        newSocket.emit("joinRoom", { userId: props?.userId, peerId: props?.peerId });

        newSocket.on("room:id", (room: number) => {
            setRoomId(room);
        });

        newSocket.on("connect_error", (err) => {
            console.error("WebSocket connection error:", err.message);
        });

        newSocket.on("history", ({ messages }: any) => setMessages(messages));
        newSocket.on("receive", (message: any) => {
            setMessages((prev) => {
                if(prev.find(m => m.id === message.id)) {
                    return prev.map((msg) => msg.id === message.id ? { ...msg, ...message } : msg)
                }
                return [...prev, message]
            })
        });
        newSocket.on("typing", ({ isTyping, roomId, userId }) => {
            const allTypingIndicator = userId !== props?.userId;
            setTyping(allTypingIndicator && isTyping);
        });
        newSocket.on("read", ({ messageIds }: any) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    messageIds.includes(msg.id) ? { ...msg, read: true } : msg
                )
            );
        });

        newSocket.on("reconnect", (attempt: any) => {
            console.log("Reconnected", attempt);
        });

        newSocket.on("reconnect_attempt", (attempt: any) => {
            console.log("Reconnection attempt", attempt);
        });

        newSocket.on("error", (error: any) => {
            console.error(error);
        });

        newSocket.on("reconnect_error", (error: any) => {
            console.error(error);
        });

        // Join the DM room
        newSocket.emit("join:dm", { peerId: props.peerId });

        setInterval(() => {
            if(newSocket && newSocket.connected) {
                newSocket?.emit("user:active", { roomId: roomId, userId: props.userId, peerId: props.peerId });
            }
        }, 2000);

        setSocket(newSocket);

        // Cleanup event listeners on unmount
        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [props.userId, props.peerId, roomId]);

    useEffect(() => {
        if(!hasScrolledToBottomRef.current && messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
            hasScrolledToBottomRef.current = true;
        }
    }, [messages, hasScrolledToBottomRef]);

    const notifyOnlineStatus = (socket: any) => {
        socket.emit("user:online", { userId: props.userId, peerId: props.peerId });
    }

    const handleMessageSending = (message: Message) => {
        if (!socket) return;

        socket.emit("typing", { isTyping: false, roomId: roomId, userId: props?.userId });

        const tempId = moment().toLocaleString();
        if (currentMessageToEdit) {
            setMessages((prev) =>
                prev.map((msg) => (msg.id === currentMessageToEdit.id ? { ...msg, roomId: roomId!, ...message, edited: true } : msg))
            );
            setCurrentMessageToEdit(null);
            const payload = { tempId: tempId, roomId: roomId, userId: props?.userId, content: message }
            socket.emit("send", payload);
            return;
        }

        setMessages((prev) => [
            ...prev,
            {   
                roomId: roomId!,
                ...message,
                replyTo: replyingTo?.id || undefined,
            }
        ]);
        setReplyingTo(null);

        socket.emit("send", { tempId, roomId: roomId, userId: props?.userId, content: message as Message });
    };

    const handleTyping = (isTyping: boolean) => {
        if (!socket) return;
        socket?.emit?.("typing", { isTyping, roomId: roomId, userId: props?.userId });
    };

    const handleDeleteMessage = (id: number) => {
        setMessages((prev) =>
            prev.map((message) =>
                message.id === id ? { ...message, removed: true } : message
            )
        );
    };

    const handleEditMessage = (id: number) => {
        const messageToEdit = messages.find((message) => message.id === id);
        if (messageToEdit && messageToEdit.text) {
            setCurrentMessageToEdit(messageToEdit);
        }
    };

    const handleRespondToMessage = (id: number) => {
        const messageToRespond = messages.find((message) => message.id === id);
        if (messageToRespond) {
            setReplyingTo(messageToRespond);
        }
    };

    const removeReaction = (id?: number) => {
        setMessages((prev) =>
            prev.map((message) =>
                message.id === id ? { ...message, reaction: undefined } : message
            )
        );
        const message = messages.find((msg) => msg.id === id);
        socket.emit("send", { tempId: message?.timestamp, roomId: roomId, userId: props?.userId, content: {...message, reaction: undefined} });
    };

    const bringToView = (id?: number) => {
        const elementToReply = document?.querySelector(`#message-${id}`);
        if (elementToReply) {
            elementToReply.scrollIntoView({ behavior: 'smooth', block: 'center' });
            elementToReply.classList.add('animate__animated', 'animate__jello');
            setTimeout(() => {
                elementToReply.classList.remove('animate__animated', 'animate__jello');
            }, 1000);
        }
    };

    const handleReactToMessage = (id?: number, reaction?: string) => {
        
        setMessages((prev) =>
            prev.map((message) =>
                message.id === id ? { ...message, reaction: reaction || '' } : message
            )
        );
        
        const message = messages.find((msg) => msg.id === id);
        socket.emit("send", { tempId: message?.timestamp, roomId: roomId, userId: props?.userId, content: {...message, reaction: reaction || ''} });
    };

    const handleCancelReplay = () => {
        setReplyingTo(null);
    };

    const handleCancelEdit = () => {
        setCurrentMessageToEdit(null);
    };

    const openImage = (file?: File) => {
        setFullScreenImage(file!);
    };

    return (
        <div className="chat-container">
            <ChatHeader {...otherUser} userName={props.peerName!}/>
            {fullscreenImage && (
                <ImageViewer file={fullscreenImage} onClose={() => setFullScreenImage(null)} />
            )}
            <div className="messages-container">
                <div className="date-divider mb-4">
                    <span className="date-badge">Today</span>
                </div>

                {messages.map((message, index) => {
                    const isConsecutive = index > 0 && messages[index - 1].userId === message.userId;
                    const showAvatar = !isConsecutive && message.userId !== props?.userId;
                    const isEmoji = message.text && /^[\p{Emoji}]/u.test(message.text.trim());

                    return (
                        <div key={message.id} className={`message-row ${message.userId === props?.userId ? 'user' : 'other'} ${isConsecutive ? 'mt-[10px]' : 'mt-[18px]'}`}>
                            <div className={`message-avatar ${!showAvatar && 'invisible'}`}>JA</div>
                            <div className={`message-content ${message.userId === props?.userId ? 'me' : 'other'}`}>
                                <div>
                                    {message.replyTo && (
                                        <div className="reply-preview" onClick={() => bringToView(message.replyTo)}>
                                            <div className="reply-text">
                                                {messages.find((m) => m.id === message.replyTo)?.text}
                                            </div>
                                        </div>
                                    )}
                                    {message.edited && !message.removed && <div className="edited">edited</div>}
                                    {message.removed ? (
                                        <div className="message-bubble">
                                            <div className="main-text">This message has been removed.</div>
                                        </div>
                                    ) : (
                                        <div id={`message-${message.id}`} className={`${isEmoji || message.file ? 'message-plain' : 'message-bubble'} ${message.userId === props?.userId ? 'user' : 'other'}`}>
                                            {message.file && !message.isAttachment && (
                                                <div className="image-container">
                                                    <img
                                                        src={URL.createObjectURL(message.file)}
                                                        alt="Uploaded"
                                                        onClick={() => openImage(message.file)}
                                                        className="message-image cursor-pointer"
                                                    />
                                                </div>
                                            )}
                                            {message.file && message.isAttachment && (
                                                <div className="attachment-container">
                                                    <a href={URL.createObjectURL(message.file)} download={message.file.name} className="attachment-link">
                                                        <Paperclip width={17} height={17} /> <span>{message.file.name}</span>
                                                    </a>
                                                </div>
                                            )}
                                            {message.text && <MessageItem text={message.text} />}
                                            {message.reaction && (
                                                <span
                                                    className={`message-reaction ${message.userId === props?.userId ? 'left-[-6px]' : 'right-[-6px]'}`}
                                                    onClick={() => removeReaction(message.id)}
                                                >
                                                    {message.reaction}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className={`message-timestamp ${message.userId === props?.userId ? 'user' : 'other'}`}>
                                        {moment(message.timestamp).format('hh:mm')}
                                    </div>
                                </div>
                                {!message.removed && (
                                    <MessageOptions
                                        messageId={message.id}
                                        isFromUser={message.userId === props?.userId}
                                        activeMessageId={activeMessageId}
                                        setActiveMessageId={setActiveMessageId as any}
                                        onReact={handleReactToMessage}
                                        onRespond={handleRespondToMessage}
                                        onDelete={handleDeleteMessage}
                                        onEdit={handleEditMessage}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="relative">
                <TypingIndicator isTyping={typing} />
                <InputArea
                    onMessageSend={handleMessageSending}
                    replyingTo={replyingTo}
                    onCancelReply={handleCancelReplay}
                    roomId={roomId!}
                    currentMessageToEdit={currentMessageToEdit}
                    onCancelEdit={handleCancelEdit}
                    onTyping={handleTyping}
                    userId={props.userId}
                />
            </div>
        </div>
    );
};

export type TChatProps = {
    userId?: number | null;
    peerId?: number | null;
    roomId?: number | null;
    peerName?: string | null;
    onMessageSend?: (message: Message) => void
    replyingTo?: Message | null;
    onCancelReply?: () => void;
    currentMessageToEdit?: Message | null;
    onCancelEdit?: () => void;
    onTyping?: (isTyping: boolean) => void;
};

export default ChatSupportContainer;
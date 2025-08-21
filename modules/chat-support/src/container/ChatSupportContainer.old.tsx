// import { useEffect, useState } from 'react';
// import { io } from "socket.io-client";
// import { ChatHeader } from 'components/ChatHeader';
// import { InputArea } from 'components/InputArea';
// import MessageOptions from 'components/MessageOption';
// import { Paperclip } from 'lucide-react';
// import { ImageViewer } from 'components/ImageViewer';
// import { MessageItem } from 'components/MessageItem';
// import moment from 'moment';

// export type Message = {
//     id: string;
//     text?: string;
//     duration?: string;
//     timestamp: string;
//     isFromUser: boolean;
//     file?: File;
//     image?: string;
//     isAttachment?: boolean;
//     reaction?: string;
//     replyTo?: string;
//     edited?: boolean;
//     removed?: boolean;
// };
// const ChatSupportContainer = () => {
//     const [socket, setSocket] = useState(null);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [typing, setTyping] = useState(false);
//     const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
//     const [replyingTo, setReplyingTo] = useState<Message | null>(null);
//     const [currentMessageToEdit, setCurrentMessageToEdit] = useState<Message | null>(null);
//     const [fullscreenImage, setFullScreenImage] = useState<File | null>(null);

//     useEffect(() => {
//         console.log(process.env.SERVER_CHAT_PORT)
//         const newSocket = io(`http://localhost:${process.env.SERVER_CHAT_PORT ?? 4000}`, {
//             reconnectionDelayMax: 20000,
//             auth: { userId: 1 },
//             query: {
//                 "chat-key": "chat-support"
//             }
//         });
//         setSocket(newSocket);

//         // Handle incoming events
//         newSocket.on("history", ({ messages }) => setMessages(messages));
//         newSocket.on("receive", (message) => setMessages((prev) => [...prev, message]));
//         newSocket.on("typing", ({ isTyping }) => setTyping(isTyping));
//         newSocket.on("read", ({ messageIds }) => {
//             setMessages((prev) =>
//                 prev.map((msg) =>
//                     messageIds.includes(msg.id) ? { ...msg, read: true } : msg
//                 )
//             );
//         });

//         // Join the DM room
//         newSocket.emit("join:dm", { peerId: 2 });

//         // Manage reconnected event
//         socket.io.on("reconnect", (attempt) => {
//             console.log("Reconnected", attempt);
//         });

//         // Manage reconnection attempt
//         socket.io.on("reconnect_attempt", (attempt) => {
//             console.log("Reconnection attempt", attempt);
//         });

//         // Manage error
//         socket.io.on("error", (error) => {
//             console.error(error);
//         });

//         // Manage reconnection error
//         socket.io.on("reconnect_error", (error) => {
//             console.error(error);
//         });


//         return () => {
//             newSocket.disconnect();
//             setSocket(null);
//         };
//     }, []);

//     const handleMessageSending = (message: Message) => {
//         if (!socket) return;

//         socket.emit("stopTyping", { to: 2 }); 

//         const tempId = moment().format('YYYYMMDDHHmmss');
//         if (currentMessageToEdit) {
//             setMessages((prev) =>
//                 prev.map((msg) => (msg.id === currentMessageToEdit.id ? { ...msg, ...message, edited: true } : msg))
//             );
//             setCurrentMessageToEdit(null);
//             socket.emit("send", { tempId, peerId: 2, message });
//             return;
//         }

//         setMessages((prev) => [
//             ...prev,
//             {
//                 ...message,
//                 replyTo: replyingTo?.id || undefined,
//             }
//         ]);
//         setReplyingTo(null);

//         socket.emit("send", { tempId, peerId: 2, message });
//     };

//     const handleTyping = (isTyping: boolean) => {
//         if (!socket) return;

//         if(isTyping) {
//             socket.emit("typing", { peerId: 2 });
//             return;
//         }

//         const TYPING_TIMEOUT = 2000; // ms
//         let typingTimeout: NodeJS.Timeout | null = null;
//         if (typingTimeout) clearTimeout(typingTimeout);

//         typingTimeout = setTimeout(() => {
//             socket.emit("stopTyping", { to: 2 });
//         }, TYPING_TIMEOUT);
//     };

//     const handleDeleteMessage = (id: string) => {
//         setMessages((prev) =>
//             prev.map((message) =>
//                 message.id === id ? { ...message, removed: true } : message
//             )
//         );
//     };

//     const handleEditMessage = (id: string) => {
//         const messageToEdit = messages.find((message) => message.id === id);
//         if (messageToEdit && messageToEdit.text) {
//             setCurrentMessageToEdit(messageToEdit);
//         }
//     };

//     const handleRespondToMessage = (id: string) => {
//         const messageToRespond = messages.find((message) => message.id === id);
//         if (messageToRespond) {
//             setReplyingTo(messageToRespond);
//         }
//     };

//     const removeReaction = (id: string) => {
//         setMessages((prev) =>
//             prev.map((message) =>
//                 message.id === id ? { ...message, reaction: undefined } : message
//             )
//         );
//     };

//     const bringToView = (id: string) => {
//         const elementToReply = document?.querySelector(`#message-${id}`);
//         if (elementToReply) {
//             elementToReply.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             elementToReply.classList.add('animate__animated', 'animate__jello');
//             setTimeout(() => {
//                 elementToReply.classList.remove('animate__animated', 'animate__jello');
//             }, 1000);
//         }
//     };

//     const handleReactToMessage = (id?: string, reaction?: string) => {
//         setMessages((prev) =>
//             prev.map((message) =>
//                 message.id === id ? { ...message, reaction: reaction || '' } : message
//             )
//         );
//     };

//     const handleCancelReplay = () => {
//         setReplyingTo(null);
//     };

//     const handleCancelEdit = () => {
//         setCurrentMessageToEdit(null);
//     };

//     const openImage = (file: File) => {
//         setFullScreenImage(file);
//     };

//     return (
//         <div className="chat-container">
//             <ChatHeader />
//             {fullscreenImage && (
//                 <ImageViewer file={fullscreenImage} onClose={() => setFullScreenImage(null)} />
//             )}
//             <div className="messages-container">
//                 <div className="date-divider mb-4">
//                     <span className="date-badge">Today</span>
//                 </div>

//                 {messages.map((message, index) => {
//                     const isConsecutive = index > 0 && messages[index - 1].isFromUser === message.isFromUser;
//                     const showAvatar = !isConsecutive && !message.isFromUser;
//                     const isEmoji = message.text && /^[\p{Emoji}]/u.test(message.text.trim());

//                     return (
//                         <div key={message.id} className={`message-row ${message.isFromUser ? 'user' : 'other'} ${isConsecutive ? 'mt-[10px]' : 'mt-[18px]'}`}>
//                             <div className={`message-avatar ${!showAvatar && 'invisible'}`}>JA</div>
//                             <div className={`message-content ${message.isFromUser ? 'me' : 'other'}`}>
//                                 <div>
//                                     {message.replyTo && (
//                                         <div className="reply-preview" onClick={() => bringToView(message.replyTo)}>
//                                             <div className="reply-text">
//                                                 {messages.find((m) => m.id === message.replyTo)?.text}
//                                             </div>
//                                         </div>
//                                     )}
//                                     {message.edited && !message.removed && <div className="edited">edited</div>}
//                                     {message.removed ? (
//                                         <div className="message-bubble">
//                                             <div className="main-text">This message has been removed.</div>
//                                         </div>
//                                     ) : (
//                                         <div id={`message-${message.id}`} className={`${isEmoji || message.file ? 'message-plain' : 'message-bubble'} ${message.isFromUser ? 'user' : 'other'}`}>
//                                             {message.file && !message.isAttachment && (
//                                                 <div className="image-container">
//                                                     <img
//                                                         src={URL.createObjectURL(message.file)}
//                                                         alt="Uploaded"
//                                                         onClick={() => openImage(message.file)}
//                                                         className="message-image cursor-pointer"
//                                                     />
//                                                 </div>
//                                             )}
//                                             {message.file && message.isAttachment && (
//                                                 <div className="attachment-container">
//                                                     <a href={URL.createObjectURL(message.file)} download={message.file.name} className="attachment-link">
//                                                         <Paperclip width={17} height={17} /> <span>{message.file.name}</span>
//                                                     </a>
//                                                 </div>
//                                             )}
//                                             {message.text && <MessageItem text={message.text} />}
//                                             {message.reaction && (
//                                                 <span
//                                                     className={`message-reaction ${message.isFromUser ? 'left-[-6px]' : 'right-[-6px]'}`}
//                                                     onClick={() => removeReaction(message.id)}
//                                                 >
//                                                     {message.reaction}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     )}
//                                     <div className={`message-timestamp ${message.isFromUser ? 'user' : 'other'}`}>
//                                         {message.timestamp}
//                                     </div>
//                                 </div>
//                                 {!message.removed && (
//                                     <MessageOptions
//                                         messageId={message.id}
//                                         isFromUser={message.isFromUser}
//                                         activeMessageId={activeMessageId}
//                                         setActiveMessageId={setActiveMessageId}
//                                         onReact={handleReactToMessage}
//                                         onRespond={handleRespondToMessage}
//                                         onDelete={handleDeleteMessage}
//                                         onEdit={handleEditMessage}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             <InputArea
//                 onMessageSend={handleMessageSending}
//                 replyingTo={replyingTo}
//                 onCancelReply={handleCancelReplay}
//                 currentMessageToEdit={currentMessageToEdit}
//                 onCancelEdit={handleCancelEdit}
//                 onTyping={handleTyping}
//             />
//         </div>
//     );
// };

// export type TChatProps = {
//     onMessageSend?: (message: Message) => void
//     replyingTo?: Message;
//     onCancelReply?: () => void;
//     currentMessageToEdit?: Message;
//     onCancelEdit?: () => void;
//     onTyping?: (isTyping: boolean) => void;
// };

// export default ChatSupportContainer;
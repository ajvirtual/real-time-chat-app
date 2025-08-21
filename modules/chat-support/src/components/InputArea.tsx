import { useEffect, useRef, useState } from "react";
import { Message, TChatProps } from "container/ChatSupportContainer";
import { Image, Paperclip, Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import moment from 'moment';
import ClickAwayListener from "./ClickAwayListener";
import { ReplyPreview } from "./ReplayPreview";

export const InputArea = (props: TChatProps) => {
    const [inputText, setInputText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const attachmentInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.currentMessageToEdit) {
            setInputText(props.currentMessageToEdit.text || '');
        }
        if (props.replyingTo || props.currentMessageToEdit) {
            textareaRef.current?.focus();
        }
    }, [props.replyingTo, props.currentMessageToEdit]);

    const handleSendMessage = (event: any) => {
        if (event.code === 'Enter' && event.shiftKey) {
            return;
        }

        if (event?.code === 'Enter' || event.type === "click") {
            event.preventDefault();
            if (inputText.trim()) {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    text: inputText,
                    timestamp: moment().format('hh:mm A'),
                    isFromUser: true,
                    replyTo: props.replyingTo?.id,
                };
                props?.onMessageSend(newMessage);
                props.replyingTo && props?.onCancelReply?.();
                textareaRef.current.style.height = 'initial';
                setInputText('');
            }
        }
    };

    const handleEmojiSelect = (emojiData: EmojiClickData, event: MouseEvent) => {
        setInputText(prev => prev + emojiData.emoji);
    };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`; // Adjust height dynamically
        }
    };

    const handleUploadAttachment = () => {
        attachmentInputRef.current?.click();
    };

    const handleChangedText = (e: any) => {
        setInputText(e.target.value)
        props?.onTyping(true);
    }

    const onAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newMessage: Message = {
                id: Date.now().toString(),
                text: "",
                file: file,
                isAttachment: true,
                timestamp: moment().format('hh:mm A'),
                isFromUser: true,
                replyTo: props.replyingTo?.id,
            };
            props?.onMessageSend(newMessage);
            props.replyingTo && props?.onCancelReply?.();
        }
    };

    const handleUploadImage = () => {
        imageInputRef.current?.click();
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newMessage: Message = {
                id: Date.now().toString(),
                text: "",
                image: URL.createObjectURL(file),
                file: file,
                timestamp: moment().format('hh:mm A'),
                isFromUser: true,
                replyTo: props.replyingTo?.id,
            };
            props?.onMessageSend(newMessage);
            props.replyingTo && props?.onCancelReply?.();
        }
    };


    return (
        <>
            <input
                type="file"
                hidden
                ref={attachmentInputRef}
                onChange={onAttachmentChange}
            />
            <input
                type="file"
                accept="image/*"
                hidden
                ref={imageInputRef}
                capture="environment"
                onChange={onImageChange}
            />

            <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
                <EmojiPicker
                    open={showEmojiPicker}
                    lazyLoadEmojis
                    onEmojiClick={handleEmojiSelect}
                />
            </ClickAwayListener>
            <div className="input-container">
                {props.replyingTo && (
                    <ReplyPreview message={props.replyingTo} onCancel={props.onCancelReply || (() => { })} />
                )}

                <div className="input-wrapper">
                    <button
                        className="input-button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <Smile />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={handleChangedText}
                        
                        onInput={handleInput}
                        onKeyDown={handleSendMessage}
                        autoFocus
                        placeholder="Write your message"
                        className="message-input"
                        rows={1}
                    />

                    <button
                        className="input-button"
                        onClick={handleUploadImage}
                    >
                        <Image />
                    </button>
                    <button
                        className="input-button"
                        onClick={handleUploadAttachment}
                    >
                        <Paperclip />
                    </button>

                    <button
                        onClick={handleSendMessage}
                        className={`send-button ${!inputText.trim() ? 'opacity-50' : ''}`}
                        disabled={!inputText.trim()}
                    >
                        <Send />
                    </button>

                </div>
            </div>
        </>
    );
};
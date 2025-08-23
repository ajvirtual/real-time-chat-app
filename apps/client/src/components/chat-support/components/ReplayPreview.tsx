import { Message } from "../container/ChatSupportContainer";

export const ReplyPreview = ({ message, onCancel }: { message: Message, onCancel: () => void }) => {
    return (
        <div className="reply-preview flex items-center justify-between px-3 py-2 shadow-sm rounded-t-lg max-w-full">
            <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-green-600 mb-0.5">
                    Reply to {message.isFromUser ? "You" : "Support"}
                </div>
                <div className="text-sm text-gray-700 truncate max-w-[220px]">
                    {message.text}
                </div>
            </div>
            <button
                onClick={onCancel}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
            >
                ✕
            </button>
        </div>
    );
};

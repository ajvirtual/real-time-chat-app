import '../styles/type-indicator.css'

export const TypingIndicator = ({ isTyping }: TTypingIndicator) => {
    if (!isTyping) {
        setTimeout(() => {
            return null;
        }, 3000);
    }

    return (
        <div className={`typing-indicator animate__animated ${isTyping ? 'animate__fadeInUp' : 'animate__fadeOut'}`}>
            <div className="typing-bubble">
                <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                </div>
            </div>
        </div>
    )
};

type TTypingIndicator = {
    isTyping?: boolean;
}
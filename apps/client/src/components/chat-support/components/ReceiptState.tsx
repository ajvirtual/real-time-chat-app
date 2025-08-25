export const ReceiptState = ({ status }: TReceiptState) => {

    const getStatusText = () => {
        switch (status) {
            case 'SENDING': return 'sending...';
            case 'SENT': return 'sent';
            case 'DELIVERED': return 'delivered';
            case 'SEEN': return 'seen';
            case 'FAILED': return 'failed';
            default: return '';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'SENDING':
                return (
                    <div className={`receipt-icon w-[14px] receipt-sending small`}>
                        <svg viewBox="0 0 16 16" className="icon-clock">
                            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                );

            case 'SENT':
                return (
                    <div className={`receipt-icon w-[14px] receipt-sent small`}>
                        <svg viewBox="0 0 16 16" className="icon-check">
                            <path d="M13.5 4L6 11.5 2.5 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );

            case 'DELIVERED':
                return (
                    <div className={`receipt-icon w-[14px] receipt-delivered small`}>
                        <svg viewBox="0 0 16 16" className="icon-delivered">
                            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M5.5 8l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );

            case 'SEEN':
                return (
                    <div className={`receipt-icon w-[14px] receipt-seen small text-primary`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1E5AA7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 12 8 17 13 8" />
                            <polyline points="7 12 12 17 17 8" />
                        </svg>
                    </div>
                );

            case 'FAILED':
                return (
                    <div className={`receipt-icon w-[15px] receipt-failed small text-danger`}>
                        <svg viewBox="0 0 16 16" className="icon-exclamation">
                            <circle cx="8" cy="8" r="6" fill="currentColor" />
                            <path d="M8 4v4M8 10v1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex gap-[7px] items-center mr-[5px]">
            {getStatusText()} {getStatusIcon()}
        </div>
    );
}

type TReceiptState = {
    status: MessageState
}

export type MessageState = 'SENDING' | 'SENT' | 'DELIVERED' | 'SEEN' | 'FAILED'
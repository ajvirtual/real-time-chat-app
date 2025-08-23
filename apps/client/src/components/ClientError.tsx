import React from "react";
import { Link } from "react-router-dom";
import "../css/error.css";

export const ClientError = ({
    element,
    className = "",
    title,
    subtitle,
    message,
    retry,
    onRetryClick,
}: ClientErrorProps) => {

    return (
        <div
            className={`client-error generic-suspense w-full h-screen flex items-center ${className}`}
        >
            <div className="px-20 flex flex-col items-center gap-5">
                <h1 className="text-[#778082]">{title}</h1>

                <h4 className="text-[#778082]">{subtitle}</h4>

                <p
                    data-testid="generic-suspense-message"
                    className="text-center text-[#778082]"
                >
                    {message}
                </p>

                <div className="flex items-center justify-center gap-2">
                    <Link
                        className="btn btn-primary"
                        to={"/"}
                    >
                        Go Home
                    </Link>

                    <button
                        className="btn bg-white border-2 border-default text-[#778082] hover:bg-default hover:text-black"
                        onClick={onRetryClick}
                        data-testid="generic-suspense-error-retry-btn"
                    >
                        {retry || "Retry"}
                    </button>
                </div>

                {element}
            </div>
        </div>
    );
};

type ClientErrorProps = {
    className?: string;
    element?: React.ReactElement;
    title?: number;
    subtitle?: string;
    message?: string;
    retry?: string;
    onRetryClick?: () => void;
};

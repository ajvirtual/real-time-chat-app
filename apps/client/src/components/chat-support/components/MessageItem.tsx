import { useEffect, useState } from "react";
// import { getLinkPreview } from "link-spreview-js";

export const MessageItem = ({ text }: { text: string }) => {

    const [preview, setPreview] = useState<LinkPreviewData>();

    useEffect(() => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const url = text.match(urlRegex)?.[0];
        if (url) {
            // getLinkPreview(`https://cors-anywhere.herokuapp.com/${url}`).then((data: any) => {
            //     if(data && data.siteName && data.title) {
            //         setPreview(data);
            //     }
            // });
        }
    }, [text]);

    if (preview) {
        return (
            <div className="main-text">
                <a
                    href={preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-sm rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition"
                >
                    {preview.images?.[0] && (
                        <img
                            src={preview.images[0]}
                            alt={preview.title}
                            className="w-full h-40 object-cover"
                        />
                    )}
                    <div className="p-3 bg-white">
                        <h3 className="font-semibold text-gray-900">{preview.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                            {preview.description}
                        </p>
                        <span className="text-xs text-blue-500">{preview.url}</span>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div className="main-text">
            {
                text.split(" ").map((word, idx) =>
                    word.match(/https?:\/\/[^\s]+/) ? (
                        <a
                            key={idx}
                            href={word}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {word}
                        </a>
                    ) : (
                        word + " "
                    )
                )
            }
        </div>
    );
}


type LinkPreviewData = {
    url?: string;
    title?: string;
    description?: string;
    images?: string[];
}
import { useState } from "react";
import { X, Download } from "lucide-react";
import { createPortal } from "react-dom";

export const ImageViewer = ({ file, onClose }: TImageViewerProps) => {

    const imageUrl = URL.createObjectURL(file!);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = file?.name || "image.png";
        link.click();
    };

    return (
        createPortal(
            <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-black/90 backdrop-blur-sm">
                <div className="absolute top-4 right-4 flex gap-3">
                    <button
                        onClick={handleDownload}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    >
                        <Download className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg object-contain"
                />
            </div>,
            document.body
        )
    );
}

type TImageViewerProps = {
    file?: File | null
    onClose?: () => void
};
"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

const CopyButton: React.FC<{ content: string }> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded border border-[#2a2f48] bg-transparent px-4 py-2 text-xs uppercase tracking-wider text-[#e2d5c8] transition-colors hover:border-[#8b8598] hover:bg-[#1a1f36]"
        >
            {copied ? (
                <Check className="h-4 w-4" />
            ) : (
                <Clipboard className="h-4 w-4" />
            )}
            {copied ? "COPIED!" : "COPY TO CLIPBOARD"}
        </button>
    );
};

export default CopyButton;

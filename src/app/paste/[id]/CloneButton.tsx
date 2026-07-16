"use client";

import { useRouter } from "next/navigation";
import { ClipboardCopy } from "lucide-react";

const CloneButton: React.FC<{
    paste: { title: string; content: string; language: string };
}> = ({ paste }) => {
    const router = useRouter();

    const handleClone = () => {
        const params = new URLSearchParams();
        if (paste.title) params.set("title", paste.title);
        params.set("content", paste.content);
        if (paste.language) params.set("language", paste.language);
        router.push(`/?${params.toString()}`);
    };

    return (
        <button
            onClick={handleClone}
            className="flex items-center gap-2 rounded border border-[#2a2f48] bg-transparent px-4 py-2 text-xs uppercase tracking-wider text-[#e2d5c8] transition-colors hover:border-[#8b8598] hover:bg-[#1a1f36]"
        >
            <ClipboardCopy className="h-4 w-4" />
            CLONE PASTE
        </button>
    );
};

export default CloneButton;

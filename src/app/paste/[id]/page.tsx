import { notFound } from "next/navigation";
import { Clock, Globe, Lock, ShieldCheck } from "lucide-react";
import { getPaste } from "@/app/actions/paste";
import CopyButton from "./CopyButton";
import CloneButton from "./CloneButton";
import CodeBlock from "./CodeBlock";

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
}

function getTimeRemaining(expiresAt: string): string {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 0)
        return `Expires in ${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`;
    if (hours > 0)
        return `Expires in ${hours} hour${hours !== 1 ? "s" : ""}`;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `Expires in ${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

function getLanguageLabel(lang: string): string {
    return lang.charAt(0).toUpperCase() + lang.slice(1);
}

function getLineCount(content: string): number {
    return content.split("\n").length;
}

function getLanguageColor(lang: string): string {
    const colors: Record<string, string> = {
        javascript: "#f7df1e",
        typescript: "#3178c6",
        python: "#3776ab",
        rust: "#dea584",
        go: "#00add8",
        html: "#e34f26",
        css: "#1572b6",
        json: "#292929",
        bash: "#4eaa25",
        plaintext: "#8b8598",
    };
    return colors[lang] || "#8b8598";
}

export default async function ViewPastePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const paste = await getPaste(id);

    if (!paste) {
        notFound();
    }

    const language = paste.language === "auto" ? "plaintext" : paste.language;
    const contentBytes = new TextEncoder().encode(paste.content).length;

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Paste header */}
            <div className="mb-2 flex items-center gap-3">
                <span
                    className="rounded px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{
                        backgroundColor: `${getLanguageColor(language)}20`,
                        color: getLanguageColor(language),
                    }}
                >
                    # {getLanguageLabel(language)}
                </span>
                <span className="text-xs text-[#8b8598]">
                    {formatFileSize(contentBytes)}
                </span>
            </div>

            <div className="mb-2 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#e2d5c8]">
                    {paste.title}
                </h1>
                <div className="flex gap-3">
                    <CopyButton content={paste.content} />
                    <CloneButton paste={paste} />
                </div>
            </div>

            <div className="mb-6 flex items-center gap-2 text-sm text-[#8b8598]">
                <Clock className="h-4 w-4" />
                <span>{getTimeRemaining(paste.expiresAt)}</span>
            </div>

            {/* Code viewer */}
            <div className="overflow-hidden rounded border border-[#2a2f48]">
                {/* Metadata bar */}
                <div className="flex items-center justify-between border-b border-[#2a2f48] bg-[#1a1f36] px-4 py-2">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-[#e74c3c]" />
                            <span className="h-3 w-3 rounded-full bg-[#f39c12]" />
                            <span className="h-3 w-3 rounded-full bg-[#2ecc71]" />
                        </div>
                        <span className="text-xs text-[#8b8598]">
                            read-only mode
                        </span>
                    </div>
                    <div className="flex gap-4 text-xs text-[#8b8598]">
                        <span>UTF-8</span>
                        <span>{getLineCount(paste.content)} lines</span>
                    </div>
                </div>

                {/* Code block */}
                <div className="bg-[#1a1f36]">
                    <CodeBlock code={paste.content} language={language} />
                </div>
            </div>

            {/* Info cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded border border-[#2a2f48] bg-[#1a1f36] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8b8598]">
                        Visibility
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#e2d5c8]">
                        <Globe className="h-4 w-4 text-[#e67e22]" />
                        Public (Visible via URL)
                    </div>
                </div>
                <div className="rounded border border-[#2a2f48] bg-[#1a1f36] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8b8598]">
                        Retention
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#e2d5c8]">
                        <Lock className="h-4 w-4 text-[#e67e22]" />
                        7 Days Auto-Wipe
                    </div>
                </div>
                <div className="rounded border border-[#2a2f48] bg-[#1a1f36] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8b8598]">
                        Security
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#e2d5c8]">
                        <ShieldCheck className="h-4 w-4 text-[#e67e22]" />
                        TLS 1.3 Encryption
                    </div>
                </div>
            </div>
        </div>
    );
}

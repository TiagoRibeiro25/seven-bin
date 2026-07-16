"use client";

import { Suspense, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, Zap } from "lucide-react";
import { createPaste } from "./actions/paste";
import { addPasteId } from "@/lib/localstorage";
import { LANGUAGES, type Language } from "@/lib/detect-language";

const HomeForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState(() => searchParams.get("title") || "");
    const [content, setContent] = useState(
        () => searchParams.get("content") || "",
    );
    const [language, setLanguage] = useState<Language>(() => {
        const lang = searchParams.get("language");
        if (lang && LANGUAGES.includes(lang as Language)) {
            return lang as Language;
        }
        return "auto";
    });
    const [submitting, setSubmitting] = useState(false);

    const charCount = content.length;
    const lineCount = content ? content.split("\n").length : 1;

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!content.trim() || submitting) return;

            setSubmitting(true);
            try {
                const result = await createPaste({
                    title: title.trim(),
                    content,
                    language,
                });
                addPasteId(result.id);
                router.push(`/paste/${result.id}`);
            } catch (err) {
                console.error("Failed to create paste:", err);
            } finally {
                setSubmitting(false);
            }
        },
        [title, content, language, submitting, router],
    );

    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            <form onSubmit={handleSubmit}>
                {/* Title row */}
                <div className="mb-6">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#8b8598]">
                        Paste Title
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Untitled Paste..."
                            className="flex-1 rounded border border-[#2a2f48] bg-[#1a1f36] px-4 py-3 text-sm text-[#e2d5c8] placeholder-[#4a4f68] outline-none focus:border-[#e67e22]"
                        />
                        <div className="flex shrink-0 items-center gap-2 text-xs text-[#8b8598]">
                            <Clock className="h-4 w-4" />
                            <span className="uppercase tracking-wider">
                                Expires after 7 days
                            </span>
                        </div>
                    </div>
                </div>

                {/* Language selector */}
                <div className="mb-4 flex justify-end">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8b8598]">
                            Language:
                        </span>
                        <select
                            value={language}
                            onChange={(e) =>
                                setLanguage(e.target.value as Language)
                            }
                            className="rounded border border-[#e67e22] bg-[#1a1f36] px-3 py-1.5 text-xs text-[#e67e22] outline-none"
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang === "auto"
                                        ? "Auto-detect"
                                        : lang.charAt(0).toUpperCase() +
                                          lang.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content textarea */}
                <div className="mb-8 rounded border border-[#2a2f48] bg-[#1a1f36]">
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`// Paste your code or text here...\n// All data is encrypted and expires automatically.`}
                        className="min-h-75 w-full resize-y bg-transparent p-4 font-mono text-sm text-[#e2d5c8] placeholder-[#4a4f68] outline-none"
                        spellCheck={false}
                    />
                    {/* Stats bar */}
                    <div className="flex items-center justify-between border-t border-[#2a2f48] px-4 py-2">
                        <div className="flex gap-6 text-xs tracking-wider text-[#8b8598]">
                            <span>
                                CHARACTERS:{" "}
                                <span className="text-[#e2d5c8]">
                                    {charCount}
                                </span>
                            </span>
                            <span>
                                LINES:{" "}
                                <span className="text-[#e2d5c8]">
                                    {lineCount}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={!content.trim() || submitting}
                        className="flex items-center gap-2 rounded bg-[#f5c8a8] px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#1a1f36] cursor-pointer transition-colors hover:bg-[#e6b896] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting ? "CREATING..." : "CREATE SECURE PASTE"}
                        {!submitting && <Zap className="h-4 w-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
};

const Home: React.FC = () => {
    return (
        <Suspense
            fallback={
                <div className="mx-auto max-w-6xl px-6 py-10 text-center text-[#8b8598]">
                    Loading...
                </div>
            }
        >
            <HomeForm />
        </Suspense>
    );
};

export default Home;

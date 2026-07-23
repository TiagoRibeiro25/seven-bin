"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getMyPasteIds, setPasteIds } from "@/lib/localstorage";
import { getPastesByIds } from "@/app/actions/paste";

interface PasteEntry {
    id: string;
    title: string;
    language: string;
    createdAt: string;
}

function formatDate(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

const MyPastesPage: React.FC = () => {
    const [pastes, setPastes] = useState<PasteEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPastes = async () => {
            const ids = getMyPasteIds();
            if (ids.length === 0) {
                setPastes([]);
                setLoading(false);
                return;
            }
            const data = await getPastesByIds(ids);
            setPastes(data);
            // Clean up stale IDs (expired or deleted pastes)
            const validIds = data.map((p) => p.id);
            setPasteIds(validIds);
            setLoading(false);
        };
        loadPastes();
    }, []);

    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            <h1 className="text-2xl font-bold text-[#e2d5c8]">
                Stored Archives
            </h1>
            <p className="mt-2 text-sm text-[#8b8598]">
                Local instances of temporary binary artifacts
            </p>

            {/* Table */}
            <div className="mt-8 overflow-hidden rounded border border-[#2a2f48]">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#2a2f48] bg-[#1a1f36]">
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-[#8b8598]">
                                Index / Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-[#8b8598]">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-widest text-[#8b8598]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-8 text-center text-sm text-[#8b8598]"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : pastes.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-8 text-center text-sm text-[#8b8598]"
                                >
                                    No pastes found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            pastes.map((paste) => (
                                <tr
                                    key={paste.id}
                                    className="border-b border-[#2a2f48] last:border-b-0 hover:bg-[#1a1f36]"
                                >
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/paste/${paste.id}`}
                                            className="text-sm text-[#e2d5c8] hover:text-[#e67e22]"
                                        >
                                            {paste.title || "Untitled Paste"}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#8b8598]">
                                        {formatDate(paste.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/paste/${paste.id}`}
                                            className="text-xs uppercase tracking-wider text-[#e67e22] hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPastesPage;

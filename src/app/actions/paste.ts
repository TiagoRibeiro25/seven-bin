"use server";

import Paste from "@/models/Paste";
import "@/lib/mongoose";
import { detectLanguage } from "@/lib/detect-language";
import { encrypt, decrypt } from "@/lib/encryption";

export async function createPaste(formData: {
    title?: string;
    content: string;
    language?: string;
}) {
    const title = formData.title?.trim() || "Untitled Paste";
    const content = formData.content;

    if (!content || content.trim().length === 0) {
        throw new Error("Content cannot be empty");
    }

    let language = formData.language || "auto";
    if (language === "auto") {
        language = detectLanguage(content);
    }

    const paste = await Paste.create({
        title,
        content: encrypt(content),
        language,
    });

    return { id: paste._id.toString() };
}

export async function getPaste(id: string) {
    try {
        const paste = await Paste.findById(id).lean();
        if (!paste) return null;

        const now = new Date();
        if (paste.expiresAt && new Date(paste.expiresAt) < now) {
            return null;
        }

        return {
            id: paste._id.toString(),
            title: paste.title,
            content: decrypt(paste.content),
            language: paste.language,
            createdAt: paste.createdAt.toISOString(),
            expiresAt: paste.expiresAt.toISOString(),
        };
    } catch {
        return null;
    }
}

export async function getPastesByIds(ids: string[]) {
    if (ids.length === 0) return [];

    try {
        const pastes = await Paste.find({ _id: { $in: ids } })
            .sort({ createdAt: -1 })
            .lean();

        const now = new Date();
        return pastes
            .filter((p) => p.expiresAt && new Date(p.expiresAt) >= now)
            .map((paste) => ({
                id: paste._id.toString(),
                title: paste.title,
                language: paste.language,
                createdAt: paste.createdAt.toISOString(),
                expiresAt: paste.expiresAt.toISOString(),
            }));
    } catch {
        return [];
    }
}

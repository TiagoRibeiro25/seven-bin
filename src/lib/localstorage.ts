const STORAGE_KEY = "seven-bin-pastes";

export function getMyPasteIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function addPasteId(id: string): void {
    if (typeof window === "undefined") return;
    try {
        const ids = getMyPasteIds();
        if (!ids.includes(id)) {
            ids.push(id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        }
    } catch {
        // localStorage unavailable
    }
}

export function removePasteId(id: string): void {
    if (typeof window === "undefined") return;
    try {
        const ids = getMyPasteIds().filter((i) => i !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
        // localStorage unavailable
    }
}

export function setPasteIds(ids: string[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
        // localStorage unavailable
    }
}

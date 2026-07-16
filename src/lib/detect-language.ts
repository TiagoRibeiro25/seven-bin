const languagePatterns: { language: string; patterns: RegExp[] }[] = [
    {
        language: "javascript",
        patterns: [
            /\bconst\b.*=/,
            /\blet\b.*=/,
            /\bfunction\b/,
            /\=>/,
            /\brequire\s*\(/,
            /\bimport\b.*from/,
            /\bexport\b/,
            /\basync\b/,
            /\bawait\b/,
            /\bconsole\.log\b/,
            /\bdocument\.\b/,
            /\bwindow\.\b/,
        ],
    },
    {
        language: "typescript",
        patterns: [
            /:\s*(string|number|boolean|any|void|never|object)\b/,
            /\binterface\b/,
            /\btype\b.*=/,
            /<.*>/,
            /\bas\b\s+(string|number|boolean|any)/,
        ],
    },
    {
        language: "python",
        patterns: [
            /\bdef\b\s+\w+/,
            /\bimport\b\s+\w+/,
            /\bfrom\b\s+\w+\s+import/,
            /\bprint\s*\(/,
            /\bclass\b\s+\w+/,
            /\bself\./,
            /\bif\s+__name__/,
            /\belif\b/,
            /\bexcept\b/,
        ],
    },
    {
        language: "rust",
        patterns: [
            /\bfn\b\s+\w+/,
            /\blet\s+mut\b/,
            /\bimpl\b/,
            /\bpub\b/,
            /\bstruct\b/,
            /\benum\b/,
            /\bmatch\b/,
            /\buse\b\s+\w+::/,
            /!\s*\(/,
        ],
    },
    {
        language: "go",
        patterns: [
            /\bfunc\b/,
            /\bpackage\b/,
            /\bimport\b\s*\(/,
            /\bfmt\.\w+/,
            /\bgo\b\s+\w+/,
            /\bchan\b/,
            /\bdefer\b/,
        ],
    },
    {
        language: "html",
        patterns: [/<\/?[a-z][\s\S]*>/i, /<!DOCTYPE/i, /<html/i, /<div/i],
    },
    {
        language: "css",
        patterns: [
            /\{[^}]*:[^}]*\}/,
            /\.[a-z][\w-]*\s*\{/,
            /#[a-f0-9]{3,8}\b/i,
            /\b(margin|padding|display|flex|grid)\b/,
        ],
    },
    {
        language: "json",
        patterns: [/^\s*\{[\s\S]*"[\w]+":\s*/m, /^\s*\[[\s\S]*\{[\s\S]*\}/m],
    },
    {
        language: "bash",
        patterns: [
            /^#!/,
            /\becho\b/,
            /\bif\s*\[/,
            /\bfi\b/,
            /\bdone\b/,
            /\bfor\b.*\bin\b/,
            /\bsudo\b/,
            /\bchmod\b/,
            /\bgrep\b/,
        ],
    },
];

export function detectLanguage(code: string): string {
    if (!code || code.trim().length === 0) return "plaintext";

    const scores: Record<string, number> = {};

    for (const { language, patterns } of languagePatterns) {
        let score = 0;
        for (const pattern of patterns) {
            const matches = code.match(new RegExp(pattern.source, "gm"));
            if (matches) {
                score += matches.length;
            }
        }
        if (score > 0) {
            scores[language] = score;
        }
    }

    const entries = Object.entries(scores);
    if (entries.length === 0) return "plaintext";

    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
}

export const LANGUAGES = [
    "auto",
    "javascript",
    "typescript",
    "python",
    "rust",
    "go",
    "html",
    "css",
    "json",
    "bash",
    "plaintext",
] as const;

export type Language = (typeof LANGUAGES)[number];

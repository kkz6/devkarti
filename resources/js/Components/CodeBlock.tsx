import React, { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

interface CodeBlockProps {
    code: string;
    lang?: string;
    theme?: string;
}

// Cache highlighters by theme
const highlighterCache = new Map<string, Promise<Highlighter>>();

// Common languages to preload
const commonLangs = [
    "javascript",
    "typescript",
    "jsx",
    "tsx",
    "php",
    "html",
    "css",
    "json",
    "bash",
];

export default function CodeBlock({
    code,
    lang = "javascript",
    theme = "github-dark",
}: CodeBlockProps) {
    const [html, setHtml] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function highlight() {
            try {
                const cacheKey = theme;

                // Check if we already have a highlighter for this theme
                if (!highlighterCache.has(cacheKey)) {
                    // Create a new highlighter with common languages
                    highlighterCache.set(
                        cacheKey,
                        createHighlighter({
                            themes: [theme],
                            langs: [...commonLangs],
                        })
                    );
                }

                const highlighter = await highlighterCache.get(cacheKey)!;

                // Check if the language is loaded
                const loadedLangs = highlighter.getLoadedLanguages();
                if (!loadedLangs.includes(lang) && lang !== "text") {
                    try {
                        // Dynamically load the language if not already loaded
                        await highlighter.loadLanguage(lang as any);
                    } catch (error) {
                        console.warn(
                            `Language '${lang}' not found, using plaintext`
                        );
                    }
                }

                const highlighted = highlighter.codeToHtml(code, {
                    lang: highlighter.getLoadedLanguages().includes(lang)
                        ? lang
                        : "text",
                    theme,
                });

                setHtml(highlighted);
                setIsLoading(false);
            } catch (error) {
                console.error("Error highlighting code:", error);
                // Fallback to plain code with basic styling
                setHtml(
                    `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
                );
                setIsLoading(false);
            }
        }

        highlight();
    }, [code, lang, theme]);

    if (isLoading) {
        return (
            <div className="relative rounded-lg bg-skin-card p-4 my-4">
                <pre className="overflow-x-auto">
                    <code className="text-sm font-mono">{code}</code>
                </pre>
            </div>
        );
    }

    return (
        <div
            className="shiki-code-block my-4 rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

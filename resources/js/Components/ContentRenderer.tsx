import React, { useMemo } from "react";
import CodeBlock from "./CodeBlock";

interface ContentRendererProps {
    content: string;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
    const processedContent = useMemo(() => {
        // Create a temporary div to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");

        // Find all pre > code elements
        const codeBlocks = doc.querySelectorAll("pre > code");

        codeBlocks.forEach((codeElement, index) => {
            const preElement = codeElement.parentElement;
            if (!preElement) return;

            // Extract language from class name (e.g., "language-javascript")
            const className = codeElement.className || "";
            const langMatch = className.match(/language-(\w+)/);
            const lang = langMatch ? langMatch[1] : "text";

            // Get the code content
            const code = codeElement.textContent || "";

            // Create a placeholder for React component
            const placeholder = doc.createElement("div");
            placeholder.setAttribute("data-code-block", "true");
            placeholder.setAttribute("data-code-index", index.toString());
            placeholder.setAttribute("data-code-lang", lang);
            placeholder.setAttribute(
                "data-code-content",
                btoa(encodeURIComponent(code))
            );

            // Replace the pre element with our placeholder
            preElement.replaceWith(placeholder);
        });

        return doc.body.innerHTML;
    }, [content]);

    // Parse the processed content and render with CodeBlock components
    const renderContent = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedContent, "text/html");
        const elements: React.ReactNode[] = [];
        let key = 0;

        const processNode = (node: Node): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;

                // Check if this is our code block placeholder
                if (element.getAttribute("data-code-block") === "true") {
                    const lang =
                        element.getAttribute("data-code-lang") || "text";
                    const encodedContent =
                        element.getAttribute("data-code-content") || "";
                    const code = decodeURIComponent(atob(encodedContent));

                    return (
                        <CodeBlock
                            key={`code-${key++}`}
                            code={code}
                            lang={lang}
                        />
                    );
                }

                // For other elements, recreate them with their children
                const tagName = element.tagName.toLowerCase();
                const props: any = { key: `element-${key++}` };

                // Copy attributes
                Array.from(element.attributes).forEach((attr) => {
                    if (attr.name === "class") {
                        props.className = attr.value;
                    } else if (attr.name === "style") {
                        // Parse style string to object
                        const styleObj: any = {};
                        attr.value.split(";").forEach((style) => {
                            const [prop, value] = style
                                .split(":")
                                .map((s) => s.trim());
                            if (prop && value) {
                                const camelCaseProp = prop.replace(
                                    /-([a-z])/g,
                                    (g) => g[1].toUpperCase()
                                );
                                styleObj[camelCaseProp] = value;
                            }
                        });
                        props.style = styleObj;
                    } else {
                        props[attr.name] = attr.value;
                    }
                });

                const children = Array.from(element.childNodes).map(
                    processNode
                );

                return React.createElement(tagName, props, ...children);
            }

            return null;
        };

        // Process all top-level nodes
        Array.from(doc.body.childNodes).forEach((node) => {
            const processed = processNode(node);
            if (processed) {
                elements.push(processed);
            }
        });

        return elements;
    }, [processedContent]);

    return (
        <article
            id="article"
            className="app-prose mt-8 prose prose-lg dark:prose-invert"
        >
            {renderContent}
        </article>
    );
}

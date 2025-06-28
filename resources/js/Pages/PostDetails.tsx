import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Datetime from "@/Components/Datetime";
import Tag from "@/Components/Tag";
import ShareLinks from "@/Components/ShareLinks";

interface Post {
    id: number;
    title: string;
    slug: string;
    description: string;
    author: string;
    content: string;
    published_at: string;
    updated_at: string;
    featured: boolean;
    tags: Array<{ id: number; name: string; slug: string }>;
}

interface PostDetailsProps {
    post: Post;
    prevPost?: { id: number; title: string; slug: string } | null;
    nextPost?: { id: number; title: string; slug: string } | null;
}

export default function PostDetails({
    post,
    prevPost,
    nextPost,
}: PostDetailsProps) {
    useEffect(() => {
        // Create progress bar
        const progressContainer = document.createElement("div");
        progressContainer.className =
            "progress-container fixed top-0 z-10 h-1 w-full bg-background";

        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar h-1 w-0 bg-accent";
        progressBar.id = "myBar";

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        // Update scroll progress
        const updateScrollProgress = () => {
            const winScroll =
                document.body.scrollTop || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const myBar = document.getElementById("myBar");
            if (myBar) {
                myBar.style.width = scrolled + "%";
            }
        };

        document.addEventListener("scroll", updateScrollProgress);

        // Add heading links
        const headings = Array.from(
            document.querySelectorAll("h2, h3, h4, h5, h6")
        );
        for (const heading of headings) {
            heading.classList.add("group");
            const link = document.createElement("a");
            link.className =
                "heading-link ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";
            link.href = "#" + heading.id;

            const span = document.createElement("span");
            span.ariaHidden = "true";
            span.innerText = "#";
            link.appendChild(span);
            heading.appendChild(link);
        }

        // Attach copy buttons to code blocks
        const copyButtonLabel = "Copy";
        const codeBlocks = Array.from(document.querySelectorAll("pre"));

        for (const codeBlock of codeBlocks) {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";

            const copyButton = document.createElement("button");
            copyButton.className =
                "copy-code absolute end-3 top-3 rounded bg-muted/80 px-2 py-1 text-xs leading-4 text-foreground font-medium";
            copyButton.innerHTML = copyButtonLabel;
            codeBlock.setAttribute("tabindex", "0");
            codeBlock.appendChild(copyButton);

            codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);
            wrapper.appendChild(codeBlock);

            copyButton.addEventListener("click", async () => {
                const code = codeBlock.querySelector("code");
                const text = code?.innerText;

                await navigator.clipboard.writeText(text ?? "");

                copyButton.innerText = "Copied";
                setTimeout(() => {
                    copyButton.innerText = copyButtonLabel;
                }, 700);
            });
        }

        // Cleanup
        return () => {
            document.removeEventListener("scroll", updateScrollProgress);
            progressContainer.remove();
        };
    }, []);

    // Back to top button handler
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Layout
            title={`${post.title} | devkarti`}
            description={post.description}
            showBreadcrumb={true}
        >
            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="mx-auto max-w-app px-4 mt-8 mb-4 flex items-center gap-1 text-accent hover:opacity-75"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span>Go back</span>
            </button>

            <main
                id="main-content"
                className="mx-auto w-full max-w-app px-4 pb-12"
                data-pagefind-body
            >
                <h1 className="inline-block text-2xl font-bold text-accent sm:text-3xl">
                    {post.title}
                </h1>

                <div className="my-2 flex items-center gap-2">
                    <Datetime datetime={post.published_at} size="lg" />
                    {post.updated_at !== post.published_at && (
                        <>
                            <span aria-hidden="true" className="max-sm:hidden">
                                |
                            </span>
                            <span className="text-sm text-muted max-sm:hidden">
                                Updated:{" "}
                                <Datetime
                                    datetime={post.updated_at}
                                    size="sm"
                                />
                            </span>
                        </>
                    )}
                </div>

                <article
                    id="article"
                    className="app-prose mx-auto mt-8 max-w-app prose prose-lg dark:prose-invert prose-pre:bg-muted/20"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <hr className="my-8 border-dashed border-border" />

                <ul className="mt-4 mb-8 sm:my-8 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </ul>

                {/* Back to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 end-8 bg-accent text-background p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
                    aria-label="Back to top"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>

                <ShareLinks
                    title={post.title}
                    description={post.description}
                    slug={post.slug}
                />

                <hr className="my-6 border-dashed border-border" />

                {/* Previous/Next Post Buttons */}
                <div
                    data-pagefind-ignore
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                    {prevPost && (
                        <Link
                            href={`/posts/${prevPost.slug}`}
                            className="flex w-full gap-1 hover:opacity-75"
                        >
                            <svg
                                className="inline-block flex-none w-5 h-5 rtl:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <div>
                                <span>Previous Post</span>
                                <div className="text-sm text-accent/85">
                                    {prevPost.title}
                                </div>
                            </div>
                        </Link>
                    )}
                    {nextPost && (
                        <Link
                            href={`/posts/${nextPost.slug}`}
                            className="flex w-full justify-end gap-1 text-end hover:opacity-75 sm:col-start-2"
                        >
                            <div>
                                <span>Next Post</span>
                                <div className="text-sm text-accent/85">
                                    {nextPost.title}
                                </div>
                            </div>
                            <svg
                                className="inline-block flex-none w-5 h-5 rtl:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </main>
        </Layout>
    );
}

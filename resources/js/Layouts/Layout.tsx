import React, { ReactNode, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Breadcrumb from "@/Components/Breadcrumb";

interface LayoutProps {
    title?: string;
    description?: string;
    children: ReactNode;
    showBreadcrumb?: boolean;
    pageTitle?: string | [string, string];
    titleTransition?: string;
    pageDesc?: string;
    bottomContent?: ReactNode;
}

export default function Layout({
    title,
    description,
    children,
    showBreadcrumb = false,
    pageTitle,
    pageDesc,
    bottomContent,
}: LayoutProps) {
    const siteTitle = title ? `${title} - devkarti` : "devkarti";
    const siteDescription =
        description ||
        "Developer, Speaker and Founder of Gigcodes. I write about coding, startups, and my journey as a full-stack developer.";

    const { url } = usePage();

    // Store back URL in session storage
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("backUrl", url);
        }
    }, [url]);

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <div className="h-screen flex flex-col">
                <Header />
                {showBreadcrumb && <Breadcrumb />}
                <main id="main-content" data-layout="index">
                    <div className="mx-auto max-w-3xl px-4">
                        {pageTitle && (
                            <>
                                <h1>
                                    {typeof pageTitle === "string" ? (
                                        pageTitle
                                    ) : (
                                        <>
                                            {pageTitle[0]}
                                            <span className="text-accent">
                                                {pageTitle[1]}
                                            </span>
                                        </>
                                    )}
                                </h1>
                                {pageDesc && (
                                    <p className="mt-2 mb-6 italic">
                                        {pageDesc}
                                    </p>
                                )}
                            </>
                        )}

                        {children}
                    </div>
                </main>
                <div className="mt-auto">
                    {bottomContent && (
                        <div className="mx-auto max-w-3xl px-4">
                            {bottomContent}
                        </div>
                    )}
                    <Footer />
                </div>
            </div>
        </>
    );
}

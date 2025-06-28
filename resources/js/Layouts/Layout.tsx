import React, { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface LayoutProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
    const siteTitle = title ? `${title} - devkarti` : 'devkarti';
    const siteDescription = description || 'Developer, Speaker and Founder of Gigcodes. I write about coding, startups, and my journey as a full-stack developer.';

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow" id="main-content">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}

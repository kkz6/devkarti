import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
    return (
        <nav className="flex items-center justify-center space-x-1 mt-8">
            {links.map((link, index) => {
                const isPageNumber = !link.label.includes('Previous') && !link.label.includes('Next');

                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-2 text-gray-400 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        } ${!isPageNumber ? 'hidden sm:inline-flex' : ''}`}
                        preserveScroll
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </nav>
    );
}

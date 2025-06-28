import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import { router } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    description: string;
    author: string;
    published_at: string;
    featured: boolean;
    tags: Array<{ id: number; name: string; slug: string }>;
}

interface SearchProps {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    query: string;
}

export default function Search({ posts, query: initialQuery }: SearchProps) {
    const [query, setQuery] = useState(initialQuery || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/search', { q: query }, { preserveState: true });
    };

    return (
        <Layout title="Search">
            <div className="mx-auto max-w-3xl px-4">
                <h1 className="text-2xl font-bold sm:text-3xl">Search</h1>

                <form onSubmit={handleSearch} className="mt-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </form>

                {initialQuery && (
                    <div className="mt-8">
                        <p className="text-gray-600 dark:text-gray-400">
                            Found {posts.total} result{posts.total !== 1 ? 's' : ''} for "{initialQuery}"
                        </p>
                    </div>
                )}

                <ul className="mt-8">
                    {posts.data.map((post) => (
                        <Card
                            key={post.id}
                            href={`/posts/${post.slug}`}
                            frontmatter={post}
                            secHeading={false}
                        />
                    ))}
                </ul>

                {posts.data.length === 0 && initialQuery && (
                    <p className="text-gray-600 dark:text-gray-400">
                        No posts found matching your search.
                    </p>
                )}

                {posts.last_page > 1 && (
                    <Pagination links={posts.links} />
                )}
            </div>
        </Layout>
    );
}

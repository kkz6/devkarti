import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

interface Tag {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

interface TagsProps {
    tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
    return (
        <Layout title="Tags">
            <div className="mx-auto max-w-3xl px-4">
                <h1 className="text-2xl font-bold sm:text-3xl">Tags</h1>

                <div className="mt-8">
                    <ul className="flex flex-wrap gap-4">
                        {tags.map((tag) => (
                            <li key={tag.id}>
                                <Link
                                    href={`/tags/${tag.slug}`}
                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="text-lg">#{tag.name}</span>
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        ({tag.posts_count})
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {tags.length === 0 && (
                        <p className="text-gray-600 dark:text-gray-400">
                            No tags found.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

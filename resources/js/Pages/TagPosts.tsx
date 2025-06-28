import React from 'react';
import Layout from '@/Layouts/Layout';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';

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

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface TagPostsProps {
    tag: Tag;
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
}

export default function TagPosts({ tag, posts }: TagPostsProps) {
    return (
        <Layout title={`Tag: ${tag.name}`}>
            <div className="mx-auto max-w-3xl px-4">
                <div className="mb-8">
                    <Link
                        href="/tags"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to tags
                    </Link>
                </div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                    Tag: <span className="text-skin-accent">#{tag.name}</span>
                </h1>

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

                {posts.data.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                        No posts found for this tag.
                    </p>
                )}

                {posts.last_page > 1 && (
                    <Pagination links={posts.links} />
                )}
            </div>
        </Layout>
    );
}

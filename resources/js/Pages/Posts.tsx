import React from 'react';
import Layout from '@/Layouts/Layout';
import Card from '@/Components/Card';
import Pagination from '@/Components/Pagination';

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

interface PostsProps {
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

export default function Posts({ posts }: PostsProps) {
    return (
        <Layout title="Posts">
            <div className="mx-auto max-w-3xl px-4">
                <h1 className="text-2xl font-bold sm:text-3xl">All Posts</h1>

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

                {posts.last_page > 1 && (
                    <Pagination links={posts.links} />
                )}
            </div>
        </Layout>
    );
}

import React from 'react';
import Layout from '@/Layouts/Layout';
import Datetime from '@/Components/Datetime';
import Tag from '@/Components/Tag';
import ShareLinks from '@/Components/ShareLinks';

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
}

export default function PostDetails({ post }: PostDetailsProps) {
    return (
        <Layout title={post.title} description={post.description}>
            <div className="mx-auto max-w-3xl px-4">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 mb-8">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                By {post.author}
                            </p>
                            <Datetime datetime={post.published_at} size="lg" />
                        </div>

                        {post.tags.length > 0 && (
                            <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Tag key={tag.id} tag={tag} size="lg" />
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className="mt-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <ShareLinks
                            title={post.title}
                            description={post.description}
                            slug={post.slug}
                        />
                    </div>
                </article>
            </div>
        </Layout>
    );
}

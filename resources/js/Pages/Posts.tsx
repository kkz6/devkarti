import React from "react";
import Layout from "@/Layouts/Layout";
import Card from "@/Components/Card";
import Pagination from "@/Components/Pagination";

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
        <Layout
            title="Posts"
            pageTitle="Posts"
            pageDesc="All the articles I've posted."
            showBreadcrumb={true}
            bottomContent={
                posts.last_page > 1 ? (
                    <Pagination
                        currentPage={posts.current_page}
                        lastPage={posts.last_page}
                        prevUrl={posts.links[0].url}
                        nextUrl={posts.links[posts.links.length - 1].url}
                    />
                ) : null
            }
        >
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
        </Layout>
    );
}

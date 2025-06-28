import React from "react";
import Layout from "@/Layouts/Layout";
import Card from "@/Components/Card";
import Hr from "@/Components/Hr";
import LinkButton from "@/Components/LinkButton";
import Socials from "@/Components/Socials";

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

interface HomeProps {
    featuredPosts: Post[];
    recentPosts: Post[];
}

export default function Home({ featuredPosts, recentPosts }: HomeProps) {
    return (
        <Layout title="Home">
            <div>
                <section id="hero" className="pb-6 pt-8">
                    <p className="my-2">
                        Developer, Speaker and Founder of Gigcodes. I write
                        about coding, startups, and my journey as a full-stack
                        developer.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                        <div className="mb-1 mr-2 whitespace-nowrap sm:mb-0">
                            Social Links:
                        </div>
                        <Socials />
                    </div>
                </section>

                <Hr />

                {featuredPosts.length > 0 && (
                    <>
                        <section id="featured" className="pb-6 pt-12">
                            <h2 className="text-2xl font-semibold tracking-wide">
                                Featured
                            </h2>
                            <ul>
                                {featuredPosts.map((post) => (
                                    <Card
                                        key={post.id}
                                        href={`/posts/${post.slug}`}
                                        frontmatter={post}
                                        secHeading={false}
                                    />
                                ))}
                            </ul>
                        </section>
                        {recentPosts.length > 0 && <Hr />}
                    </>
                )}

                {recentPosts.length > 0 && (
                    <section id="recent-posts" className="pb-6 pt-12">
                        <h2 className="text-2xl font-semibold tracking-wide">
                            Recent Posts
                        </h2>
                        <ul>
                            {recentPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    href={`/posts/${post.slug}`}
                                    frontmatter={post}
                                    secHeading={false}
                                />
                            ))}
                        </ul>
                    </section>
                )}

                <div className="my-8 text-center">
                    <LinkButton href="/posts">
                        All Posts
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block ml-2 w-6 h-6"
                        >
                            <path
                                fill="currentColor"
                                d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
                            />
                        </svg>
                    </LinkButton>
                </div>
            </div>
        </Layout>
    );
}

import React from "react";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";

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
        <Layout title="Tags" showBreadcrumb={true} activeNav="tags">
            <h1 className="text-2xl font-bold sm:text-3xl">Tags</h1>
            <div className="mt-8">
                <ul className="flex flex-wrap gap-4">
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <Link
                                href={`/tags/${tag.slug}`}
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-skin-card hover:bg-skin-card-muted transition-colors"
                            >
                                <span className="text-lg">#{tag.name}</span>
                                <span className="ml-2 text-sm text-skin-base/70">
                                    ({tag.posts_count})
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {tags.length === 0 && (
                    <p className="text-skin-base/70">No tags found.</p>
                )}
            </div>
        </Layout>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';
import Datetime from './Datetime';
import Tag from './Tag';

interface CardProps {
    href: string;
    frontmatter: {
        title: string;
        description: string;
        published_at: string;
        tags?: Array<{ id: number; name: string; slug: string }>;
    };
    secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: CardProps) {
    const { title, published_at, description, tags } = frontmatter;

    const HeadingTag = secHeading ? 'h2' : 'h3';

    return (
        <li className="my-6">
            <Link
                href={href}
                className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
            >
                <HeadingTag className="text-lg font-medium decoration-dashed hover:underline">
                    {title}
                </HeadingTag>
            </Link>
            <Datetime datetime={published_at} />
            <p className="mt-2">{description}</p>
            {tags && tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </div>
            )}
        </li>
    );
}

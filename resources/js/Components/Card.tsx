import React from "react";
import { Link } from "@inertiajs/react";
import Datetime from "./Datetime";
import Tag from "./Tag";

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

export default function Card({
    href,
    frontmatter,
    secHeading = true,
}: CardProps) {
    const { title, published_at, description } = frontmatter;

    const HeadingTag = secHeading ? "h2" : "h3";

    return (
        <li className="my-6">
            <Link href={href} className="post-link">
                <HeadingTag className="post-title text-lg font-medium text-accent decoration-dashed hover:underline">
                    {title}
                </HeadingTag>
            </Link>
            <Datetime datetime={published_at} />
            <p>{description}</p>
        </li>
    );
}

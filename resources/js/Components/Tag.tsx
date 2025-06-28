import React from 'react';
import { Link } from '@inertiajs/react';

interface TagProps {
    tag: {
        id: number;
        name: string;
        slug: string;
    };
    size?: 'sm' | 'lg';
}

export default function Tag({ tag, size = 'sm' }: TagProps) {
    return (
        <Link
            href={`/tags/${tag.slug}`}
            className={`${
                size === 'sm' ? 'text-sm' : 'text-lg'
            } pr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200`}
        >
            #{tag.name}
        </Link>
    );
}

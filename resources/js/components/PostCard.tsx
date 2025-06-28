import React from 'react';
import { Link } from '@inertiajs/react';

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  pubDatetime: string;
  tags: Array<{ id: number; name: string; slug: string }>;
  featured: boolean;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.pubDatetime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="border rounded-lg p-6 hover:shadow-lg transition">
      <Link href={`/posts/${post.slug}`} className="block">
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition">
          {post.title}
        </h3>
      </Link>
      
      <p className="text-gray-600 mb-4">{post.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <time dateTime={post.pubDatetime}>{formattedDate}</time>
        
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${tag.slug}`}
              className="hover:text-blue-600 transition"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
} 
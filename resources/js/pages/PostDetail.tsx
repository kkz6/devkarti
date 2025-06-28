import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../layouts/Layout';
import { marked } from 'marked';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  description: string;
  pubDatetime: string;
  modDatetime?: string;
  tags: Tag[];
  featured: boolean;
}

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const formattedDate = new Date(post.pubDatetime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const htmlContent = marked(post.content);

  return (
    <Layout title={post.title} description={post.description}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.pubDatetime}>{formattedDate}</time>
          </div>

          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/posts?tag=${tag.slug}`}
                className="bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <footer className="mt-12 pt-8 border-t">
          <Link
            href="/posts"
            className="text-blue-600 hover:underline"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </Layout>
  );
} 
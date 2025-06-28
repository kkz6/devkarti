import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../layouts/Layout';
import PostCard from '../components/PostCard';

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  pubDatetime: string;
  tags: Array<{ id: number; name: string; slug: string }>;
  featured: boolean;
}

interface PostsProps {
  posts: Post[];
  total: number;
  page: number;
  lastPage: number;
}

export default function Posts({ posts, total, page, lastPage }: PostsProps) {
  return (
    <Layout title="All Posts" description="Browse all blog posts">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Posts</h1>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {lastPage > 1 && (
          <div className="flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/posts?page=${page - 1}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Previous
              </Link>
            )}
            
            <span className="px-4 py-2">
              Page {page} of {lastPage}
            </span>
            
            {page < lastPage && (
              <Link
                href={`/posts?page=${page + 1}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
} 
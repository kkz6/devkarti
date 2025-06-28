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

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout title="Home" description="A personal blog about science, programming, and technology">
      <div className="space-y-12">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to DevKarti</h1>
          <p className="text-xl text-gray-600">
            A personal blog about science, programming, and technology
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/posts"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
} 
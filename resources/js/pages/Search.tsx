import React, { useState, useMemo } from 'react';
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

interface SearchProps {
  posts: Post[];
}

export default function Search({ posts }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    
    const term = searchTerm.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(term))
    );
  }, [posts, searchTerm]);

  return (
    <Layout title="Search" description="Search blog posts">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Posts</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {searchTerm && (
          <p className="mb-4 text-gray-600">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchTerm}"
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {searchTerm && filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No posts found matching your search.
          </p>
        )}
      </div>
    </Layout>
  );
} 
import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../layouts/Layout';

interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

interface TagsProps {
  tags: Tag[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <Layout title="Tags" description="Browse posts by tags">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tags</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${tag.slug}`}
              className="block p-4 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">#{tag.name}</h3>
              <p className="text-gray-600 mt-1">
                {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
} 
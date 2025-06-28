import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            DevKarti
          </Link>
          
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-blue-600 transition">
                Posts
              </Link>
            </li>
            <li>
              <Link href="/tags" className="hover:text-blue-600 transition">
                Tags
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-blue-600 transition">
                Search
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 transition">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
} 
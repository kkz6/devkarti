import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || 'DevKarti'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
} 
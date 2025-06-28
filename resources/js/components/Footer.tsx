import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; {currentYear} DevKarti. All rights reserved.</p>
          <p className="mt-2">
            Built with NestJS, Inertia.js, and React
          </p>
        </div>
      </div>
    </footer>
  );
} 
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';

// Get the initial page data from the server
const appElement = document.getElementById('app');
let pageData = null;

if (appElement && appElement.dataset.page) {
  try {
    pageData = JSON.parse(decodeURIComponent(appElement.dataset.page));
  } catch (e) {
    console.error('Failed to parse page data:', e);
  }
}

createInertiaApp({
  title: (title) => `${title} - DevKarti`,
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
    const page = pages[`./pages/${name}.tsx`];
    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
}); 
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';

// Get the initial page data from the server
const appElement = document.getElementById('app');
const page = appElement ? JSON.parse(appElement.dataset.page || '{}') : {};

createInertiaApp({
  title: (title) => `${title} - DevKarti`,
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
    return pages[`./pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  page,
}); 
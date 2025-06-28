import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './resources',
  base: '/',
  build: {
    manifest: true,
    outDir: '../public/build',
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'resources/js/app.tsx'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js'),
    },
  },
}); 
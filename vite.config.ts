import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'resources',
  base: '/',
  publicDir: '../public',
  server: {
    host: 'localhost',
    port: 5173,
    cors: true,
    hmr: {
      host: 'localhost',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './resources/js'),
    },
  },
  build: {
    outDir: '../public/build',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'resources/js/app.tsx'),
      },
    },
  },
}); 
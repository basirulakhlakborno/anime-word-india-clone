import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    // HTML optimization plugin
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Anime World India',
          description: 'Watch anime online on Anime World India',
        },
      },
    }),
    // PWA plugin for offline support and better SEO
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Anime World India',
        short_name: 'AnimeWorld',
        description: 'Watch anime online',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    // Compression plugin for better performance
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Sitemap generation
    sitemap({
      hostname: 'https://animeworldindia.com', // Update with your actual domain
      dynamicRoutes: ['/'], // Add your routes here
    }),
  ],
  build: {
    // Optimize build output
    minify: 'esbuild',
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  // Server configuration
  server: {
    port: 5173, // Client dev server port (different from API server port 3001)
    open: true,
    proxy: {
      // Proxy API requests to backend server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // Preview configuration
  preview: {
    port: 5173,
  },
});

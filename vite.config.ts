import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: Number(process.env.PORT) || 3000,
    proxy: {
      '/finance-api': {
        target: 'https://api.hgbrasil.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/finance-api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

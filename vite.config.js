import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Kdhaly-cafe/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // don't inline webp frames into base64
  }
});
